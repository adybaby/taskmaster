/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { TextField, Typography, Button, Divider } from '@material-ui/core';
import { Formik, FieldArray, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { formatDate, isValidDateString } from '../../util/Dates';
import { EditContributions } from './EditContributions';
import { DropDown } from '../DropDown';
import { formatUserName } from '../../util/Users';
import { YesNoDialog } from '../YesNoDialog';

const variant = typographyVariant.task;

export const EditTask = ({ task, onClose, onError, onExitTask, onNewTask }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  const initialValues = {
    title: task.title == null ? '' : task.title,
    moreInformation: task.moreInformation == null ? '' : task.moreInformation,
    hypotheses: task.hypotheses == null ? '' : task.hypotheses,
    successfulIf: task.successfulIf == null ? '' : task.successfulIf,
    approach: task.approach == null ? '' : task.approach,
    relatedLinks: task.relatedLinks == null ? '' : task.relatedLinks.join(', '),
    tags: task.tags == null ? '' : task.tags.join(', '),
    startDate: task.startDate == null ? '' : formatDate(task.startDate),
    endDate: task.startDate == null ? '' : formatDate(task.endDate),
    editors: task.editors == null ? [currentUser.id] : task.editors,
    contributesTo: task.contributesTo == null ? [] : task.contributesTo,
    contributions: task.contributions == null ? [] : task.contributions,
  };

  const makeField = (formik, title, value, hint, autoFocus = false) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        {title}
      </Typography>
      <Typography variant="body2">
        <i>{hint}</i>
      </Typography>
      <TextField
        value={formik.values[value]}
        variant="outlined"
        multiline
        fullWidth
        className={classes.taskSectionBody}
        type={value}
        name={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autoFocus={autoFocus}
        error={formik.touched[value] && formik.errors[value] != null}
        helperText={formik.errors[value]}
      />
    </>
  );

  const getValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'You must enter a title';
    } else if (values.title.length > 100) {
      errors.title = 'The title must be 100 characters or less';
    }
    if (!values.moreInformation) {
      errors.moreInformation = 'You must give a short overview';
    } else if (values.moreInformation.length > 500) {
      errors.moreInformation = 'The overview must be 255 characters or less';
    }
    if (task.type === 'INITIATIVE') {
      if (!values.startDate) {
        errors.startDate = 'You must enter a start date (you can change it later)';
      } else if (!isValidDateString(values.startDate)) {
        errors.startDate = `${values.startDate} is not a valid date`;
      }
      if (!values.endDate) {
        errors.endDate = 'You must enter an end date (you can change it later)';
      } else if (!isValidDateString(values.endDate)) {
        errors.endDate = `${values.endDate} is not a valid date`;
      }
    }
    if (values.relatedLinks != null) {
      const linkErrors = [];
      values.relatedLinks
        .split(',')
        .map((rl) => rl.trim())
        .forEach((link) => {
          if (
            link !== '' &&
            !/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(
              link
            )
          ) {
            linkErrors.push(`${link} is not a valid URL`);
          }
        });
      if (linkErrors.length > 0) {
        errors.relatedLinks = linkErrors.join('. ');
      }
    }
    return errors;
  };

  const onSubmit = (values, { setSubmitting }) => {
    const update = {
      ...task,
      ...values,
      relatedLinks: values.relatedLinks.split(',').map((rl) => rl.trim()),
      tags: values.tags.split(',').map((t) => t.trim()),
    };
    let newTask = false;
    if (update.id == null) {
      newTask = true;
    }
    db.upsertTask(update)
      .then((updatedTask) => {
        db.upsertContributionLinks(task.id, values.contributesTo, values.contributions)
          .then(() => {
            setSubmitting(false);
            if (newTask) {
              onNewTask(updatedTask);
            } else {
              onClose(updatedTask);
            }
          })
          .catch((e) => {
            const errorMessage = `Added task, but could not add contributions: ${e.message}`;
            logger.error(errorMessage, e, update);
            setSubmitting(false);
            onError(errorMessage);
          });
      })
      .catch((e) => {
        const errorMessage = `Could not update task. ${e}`;
        logger.error(errorMessage, e, update);
        setSubmitting(false);
        onError(errorMessage);
      });
  };

  const makeInitiativeFields = (formik) =>
    task.type !== 'INITIATIVE' ? null : (
      <>
        {makeField(formik, 'Hypotheses', 'hypotheses', 'What are you trying to prove?')}
        {makeField(
          formik,
          'Successful If',
          'successfulIf',
          'What needs to happen to prove your hypotheses?'
        )}
        {makeField(formik, 'Approach', 'approach', 'How are you going to prove your hypotheses?')}
        {makeField(formik, 'Start Date', 'startDate', 'When does the initiative start?')}
        {makeField(formik, 'End Date', 'endDate', 'When does the initiative end?')}
      </>
    );

  const makeContributionField = (formik, label, field, hint) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        {label}
      </Typography>
      <Typography variant="body2">
        <i>{hint}</i>
      </Typography>
      <FieldArray
        name={field}
        render={(arrayHelpers) => (
          <EditContributions
            value={formik.values[field]}
            field={field}
            taskType={task.type}
            taskId={task.id}
            onAdd={(contribution) => {
              logger.debug('Adding contribution', contribution);
              arrayHelpers.push({
                ...contribution,
                createdDate: new Date(),
                createdBy: currentUser.id,
              });
            }}
            onRemove={(id) => {
              logger.debug('Removing contribution with id ', id);
              arrayHelpers.remove(formik.values[field].findIndex((c) => c._id === id));
            }}
            style={{ paddingBottom: '14px', paddingTop: '14px' }}
          />
        )}
      />
    </>
  );

  const makeContributionFields = (formik) => {
    switch (task.type) {
      case 'DRIVER':
        return makeContributionField(
          formik,
          'Contributions',
          'contributions',
          'Are there any enabler(s) which contribute towards this driver already?'
        );
      case 'ENABLER':
        return (
          <>
            {makeContributionField(
              formik,
              'Contributes to',
              'contributesTo',
              'Which driver(s) does this enabler contribute towards?'
            )}
            {makeContributionField(
              formik,
              'Contributions',
              'contributions',
              'Are there any initiative(s) which contribute towards this enabler already?'
            )}
          </>
        );
      case 'INITIATIVE':
        return makeContributionField(
          formik,
          'Contributes to',
          'contributesTo',
          'Which enabler(s) does this initiative contribute towards?'
        );
      default:
        return null;
    }
  };

  const makeEditorField = (formik) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        Editors
      </Typography>
      <Typography variant="body2">
        <i>
          Who can edit the task? (you cannot remove yourself as an editor, but other editors can)
        </i>
      </Typography>
      <FieldArray
        name="editors"
        render={(arrayHelpers) => (
          <DropDown
            divStyle={{ paddingBottom: '14px' }}
            id="editors"
            value={formik.values.editors}
            multiple
            fullWidth
            items={users.map((user) => ({ label: formatUserName(user), value: user.id }))}
            onAdd={(id, editors, addedEditorId) => {
              logger.debug(`Adding editor with id ${addedEditorId}`);
              arrayHelpers.push(addedEditorId);
            }}
            onDelete={(id, editors, removedEditorId) => {
              if (removedEditorId === currentUser.id) {
                logger.debug(`Cannot remove editor because that is the current user`);
              } else {
                logger.debug(`Removing editor with id ${removedEditorId}`);
                arrayHelpers.remove(
                  formik.values.editors.findIndex((editorId) => editorId === removedEditorId)
                );
              }
            }}
          />
        )}
      />
    </>
  );

  const makeFooter = (formik) => (
    <div
      className={`${classes.editTaskFooter} ${
        formik.dirty || formik.values.title === '' ? 'open' : undefined
      }`}
    >
      <div className={classes.taskEditedMessageDiv}>
        <Typography className={classes.taskEditedMessage}>
          Your changes will not be saved until you confirm them
        </Typography>
      </div>
      <Button
        style={{ color: 'lightGrey' }}
        onClick={() => {
          if (task.id == null) {
            onExitTask();
          } else {
            formik.handleReset();
          }
        }}
      >
        CANCEL CHANGES
      </Button>
      <Button type="submit" style={{ color: 'white' }} disabled={formik.isSubmitting}>
        <b>CONFIRM CHANGES</b>
      </Button>
    </div>
  );

  const DeletePanel = () => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleClose = (confirmed) => {
      if (confirmed) {
        db.deleteTask(task.id)
          .then((deletedTask) => {
            logger.debug('Deleted task: ', deletedTask);
            onExitTask();
          })
          .catch((e) => onError(`Could not delete task. ${e}`));
      }
      setConfirmOpen(false);
    };

    if (task.id == null) return null;

    return (
      <>
        <Button
          color="primary"
          style={{ padding: '20px' }}
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          DELETE TASK
        </Button>
        <Divider />
        <YesNoDialog
          title="Do you want to delete this task? This will also delete any associated vacancies, interests, and contribution links."
          yesLabel="DELETE"
          noLabel="CANCEL"
          handleClose={handleClose}
          open={confirmOpen}
        />
      </>
    );
  };

  return (
    <>
      <DeletePanel />
      <Formik initialValues={initialValues} validate={getValidation} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <div className={classes.taskContent}>
              {makeField(
                formik,
                'Title',
                'title',
                `What is the ${task.type.toLowerCase()} called? (max 100 characters)`,
                true
              )}
              {makeField(
                formik,
                'Outline',
                'moreInformation',
                `Roughly what is this ${task.type.toLowerCase()} about? This is displayed in search results, so keep it short and snappy (max 500 characters).`
              )}
              {makeInitiativeFields(formik)}
              {makeContributionFields(formik)}
              {makeEditorField(formik)}
              {makeField(
                formik,
                'Related Links',
                'relatedLinks',
                'Seperate multiple links with commas.'
              )}
              {makeField(formik, 'Tags', 'tags', 'Separate multiple tags with commas.')}
            </div>
            {makeFooter(formik)}
          </Form>
        )}
      </Formik>
    </>
  );
};
