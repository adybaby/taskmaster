/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { formatDate, isValidDateString, day } from '../../util/Dates';
import { formatUserName } from '../../util/Users';
import { FormikTextField } from '../formik/FormikTextField';
import { FormikForm } from '../formik/FormikForm';
import { FormikArrayField } from '../formik/FormikArrayField';
import { DeleteTaskDialog } from './DeleteTaskDialog';
import { ContributionFields } from './ContributionFields';
import { Hint, HINT_IDS } from '../hints/Hint';
import { useStyles } from '../../styles/Styles';

export const EditTask = ({
  task,
  onError,
  onDeletedTask,
  onUpdatedTask,
  onCreatedTask,
  onNewTaskCancelled,
}) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  const initialValues = {
    title: task.title == null ? '' : task.title,
    shortDescription: task.shortDescription == null ? '' : task.shortDescription,
    moreInformation: task.moreInformation == null ? '' : task.moreInformation,
    hypotheses: task.hypotheses == null ? '' : task.hypotheses,
    successfulIf: task.successfulIf == null ? '' : task.successfulIf,
    approach: task.approach == null ? '' : task.approach,
    relatedLinks: task.relatedLinks == null ? '' : task.relatedLinks.join(', '),
    tags: task.tags == null ? '' : task.tags.join(', '),
    startDate:
      task.startDate == null
        ? task.type === 'INITIATIVE'
          ? ''
          : formatDate(new Date())
        : formatDate(task.startDate),
    endDate:
      task.endDate == null
        ? task.type === 'INITIATIVE'
          ? ''
          : formatDate(day(null, -365))
        : formatDate(task.endDate),
    editors: task.editors == null ? [currentUser.id] : task.editors,
    contributesTo: task.contributesTo == null ? [] : task.contributesTo,
    contributions: task.contributions == null ? [] : task.contributions,
  };

  const validation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'You must enter a title';
    } else if (values.title.length > 100) {
      errors.title = 'The title must be 100 characters or less';
    }
    if (!values.shortDescription) {
      errors.shortDescription = 'You must give a short summary';
    } else if (values.shortDescription.length > 255) {
      errors.shortDescription = 'The overview must be 255 characters or less';
    }
    if (!values.editors || values.editors.length === 0) {
      errors.editors = 'There must be at least one editor';
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

  const prepareValues = (values) => ({
    ...task,
    ...values,
    relatedLinks: values.relatedLinks.split(',').map((rl) => rl.trim()),
    tags: values.tags.split(',').map((t) => t.trim()),
  });

  const renderFields = (formik) => (
    <>
      <FormikTextField
        title="Title"
        field="title"
        hint={`What is the ${task.type.toLowerCase()} called? (max 100 characters)`}
        mandatory
        autoFocus
      />
      <FormikTextField
        title="Summary"
        field="shortDescription"
        hint={`Roughly what is this ${task.type.toLowerCase()} about? This is displayed in search results, so keep it short and snappy (max 255 characters).`}
      />
      <FormikTextField
        title="Start Date"
        field="startDate"
        hint={
          task.type !== 'INITIATIVE'
            ? 'When does the initiative start?'
            : 'When should this requirement activate? Active requirements affect priorities and are visible in the current priorities list (using default filters.) When the date expires, the requirement will no longer be visible and will not affect priorities.  You can always extend the period later, or make the requirement inactive later, if you need to.'
        }
        mandatory
      />
      <FormikTextField
        title="End Date"
        field="endDate"
        hint={
          task.type !== 'INITIATIVE'
            ? 'When does the initiative end?'
            : 'When should this requirement deactivate?'
        }
        mandatory
      />
      <FormikTextField
        title="Outline"
        field="moreInformation"
        hint={`Describe the ${task.type.toLowerCase()}`}
      />
      {task.type !== 'INITIATIVE' ? null : (
        <>
          <FormikTextField
            title="Hypotheses"
            field="hypotheses"
            hint="What are you trying to prove?"
          />
          <FormikTextField
            title="Successful If"
            field="successfulIf"
            hint="What needs to happen to prove your hypotheses?"
          />
          <FormikTextField
            title="Approach"
            field="approach"
            hint="How are you going to prove your hypotheses?"
          />
        </>
      )}
      <ContributionFields formik={formik} task={task} currentUser={currentUser} />
      <FormikArrayField
        title="Editors"
        field="editors"
        options={users.map((user) => ({ label: formatUserName(user), value: user.id }))}
        multiple
        hint="Who can edit the task? (at least one editor is required)"
      />
      <FormikTextField
        title="Related Links"
        field="relatedLinks"
        hint="Seperate multiple links with commas."
      />
      <FormikTextField title="Tags" field="tags" hint="Separate multiple tags with commas." />
      {task.type !== 'DRIVER' ? null : (
        <>
          <Typography className={classes.fieldHeading} variant="h5">
            Priority
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '14px' }}>
            To change the priority of drivers, first complete and save this page, then head into the{' '}
            <i>MAP</i> tab from the home page, and move it up or down the list of drivers.
          </Typography>
        </>
      )}
    </>
  );

  const getHint = () => {
    switch (task.type) {
      case 'DRIVER':
        return <Hint id={HINT_IDS.EDIT_DRIVER} className={classes.editTaskHint} />;
      case 'ENABLER':
        return <Hint id={HINT_IDS.EDIT_ENABLER} className={classes.editTaskHint} />;
      case 'INITIATIVE':
        return <Hint id={HINT_IDS.EDIT_INITIATIVE} className={classes.editTaskHint} />;
      default:
        return null;
    }
  };

  return (
    <>
      {getHint()}
      <DeleteTaskDialog taskId={task.id} onDeleted={onDeletedTask} onError={onError} />
      <FormikForm
        preEditedEntity={task}
        entityName="Task"
        upsertMethod="upsertTask"
        initialValues={initialValues}
        validation={validation}
        renderFields={renderFields}
        prepareValues={prepareValues}
        onUpdated={(update) => {
          if (task.id == null) {
            onCreatedTask(update);
          } else {
            onUpdatedTask(update);
          }
        }}
        onNewTaskCancelled={onNewTaskCancelled}
        onError={onError}
        isNew={task.id == null}
      />
    </>
  );
};
