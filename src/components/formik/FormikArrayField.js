/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Typography } from '@material-ui/core';
import { FieldArray, useField } from 'formik';
import { DropDown } from '../DropDown';
import { useStyles } from '../../styles/Styles';
import * as logger from '../../util/Logger';

export const FormikArrayField = ({
  title,
  field: fieldName,
  options,
  hint,
  autoFocus = false,
  fullWidth = true,
  mandatory = false,
  multiple = false,
}) => {
  const [field, meta] = useField(fieldName);
  const styleProps = { style: { display: 'inline-block' } };
  const classes = useStyles()();
  if (meta.touched && meta.error != null) {
    styleProps.style.color = 'red';
  }

  return (
    <>
      <Typography {...styleProps} className={classes.fieldHeading} variant="h5">
        {title}
      </Typography>
      {mandatory ? (
        <Typography {...styleProps} variant="body2">
          <b>&nbsp;&nbsp;(required)</b>
        </Typography>
      ) : null}
      {hint != null ? (
        <Typography variant="body2">
          <i>{hint}</i>
        </Typography>
      ) : null}
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <DropDown
            className={classes.fieldBody}
            id={field.name}
            value={meta.value}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
            items={options}
            multiple={multiple}
            onAdd={(id, selectedValues, addedValue) => {
              logger.debug(`Adding ${title}: ${addedValue}`);
              arrayHelpers.push(addedValue);
            }}
            onDelete={(id, selectedValues, removedValue) => {
              logger.debug(`Removing ${title}: ${removedValue}`);
              arrayHelpers.remove(meta.value.findIndex((val) => val === removedValue));
            }}
          />
        )}
      />
    </>
  );
};
