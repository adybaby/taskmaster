/* eslint-disable no-underscore-dangle */
import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { Formik, FieldArray } from 'formik';
import { useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { formatDate, isValidDateString } from '../../util/Dates';
import { EditContributions } from './EditContributions';
import { DropDown } from '../DropDown';
import { formatUserName } from '../../util/Users';

const variant = typographyVariant.task;

export const EditTask = ({ task, onClose, onError }) => {
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
    db.upsertTask(update)
      .then((updatedTask) => {
        db.upsertContributionLinks(task.id, values.contributesTo, values.contributions)
          .then((newContributionLinks) => {
            setSubmitting(false);
            onClose([updatedTask, newContributionLinks]);
          })
          .catch((e) => {
            const errorMessage = `Added task, but could not add contributions: ${e.message}`;
            logger.error(errorMessage, e, update);
            setSubmitting(false);
            onError(errorMessage);
          });
      })
      .catch((e) => {
        const errorMessage = `Could not update task: ${e.message}`;
        logger.error(errorMessage, e, update);
        setSubmitting(false);
        onError(errorMessage);
      });
  };

  const makeInitiativeFields = (formik) => (
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
    <div className={`${classes.editTaskFooter} ${formik.dirty ? 'open' : undefined}`}>
      <div className={classes.taskEditedMessageDiv}>
        <Typography className={classes.taskEditedMessage}>
          Your changes will not be saved until you confirm them
        </Typography>
      </div>
      <Button style={{ color: 'lightGrey' }} onClick={formik.handleReset}>
        CANCEL CHANGES
      </Button>
      <Button type="submit" style={{ color: 'white' }} disabled={formik.isSubmitting}>
        <b>CONFIRM CHANGES</b>
      </Button>
    </div>
  );

  return (
    <Formik initialValues={initialValues} validate={getValidation} onSubmit={onSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.taskContent}>
            {makeField(formik, 'Title', 'title', 'What is the initiative called? ', true)}
            {makeField(
              formik,
              'Outline',
              'moreInformation',
              'Roughly what is this initiative about? This is displayed in search results, so keep it short and snappy.'
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
            {makeField(
              formik,
              'Tags',
              'tags',
              'Tags must be one word each (use underscores _ for spaces). Seperate multiple tags with commas.'
            )}
          </div>
          {makeFooter(formik)}
        </form>
      )}
    </Formik>
  );
};
