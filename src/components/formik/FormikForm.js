import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import { useStyles } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';

export const FormikForm = ({
  preEditedEntity,
  entityName,
  upsertMethod,
  initialValues,
  validation,
  renderFields,
  prepareValues,
  onNewTaskCancelled,
  onUpdated,
  onError,
  isNew = false,
}) => {
  const classes = useStyles()();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values, { setSubmitting }) => {
    let preparedValues = values;
    if (prepareValues != null) {
      preparedValues = prepareValues(values);
    }

    const update = {
      ...preEditedEntity,
      ...preparedValues,
    };
    db[upsertMethod](update)
      .then((updated) => {
        setSubmitting(false);
        const successMessage = isNew
          ? `New ${entityName} Added.`
          : `${entityName} details have been updated.`;
        enqueueSnackbar(successMessage, { variant: 'success' });
        onUpdated(updated);
      })
      .catch((e) => {
        const errorMessage = `There was a problem ${
          isNew ? 'creating' : 'updating'
        } the ${entityName}: ${e.message}`;
        logger.error(errorMessage, e, update);
        setSubmitting(false);
        onError(errorMessage);
      });
  };

  const makeFooter = (formik) => (
    <div
      zindex="9999"
      className={`${classes.formFooter} ${formik.dirty || isNew ? 'open' : undefined}`}
    >
      <div className={classes.formEditedMessageDiv}>
        <Typography className={classes.formEditedMessage}>
          Your changes will not be saved until you confirm them
        </Typography>
      </div>
      <Button
        style={{ color: 'lightGrey' }}
        onClick={isNew ? onNewTaskCancelled : formik.handleReset}
      >
        CANCEL CHANGES
      </Button>
      <Button type="submit" style={{ color: 'white' }} disabled={formik.isSubmitting}>
        <b>CONFIRM CHANGES</b>
      </Button>
    </div>
  );

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      validate={validation}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className={classes.formContent}>{renderFields(formik)}</div>
          {makeFooter(formik)}
        </Form>
      )}
    </Formik>
  );
};
