import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { useStyles } from '../../styles/Styles';

export const FormikTextField = ({
  title,
  field: fieldName,
  hint,
  autoFocus = false,
  mandatory = false,
  multiline = true,
  fullWidth = true,
  variant = 'outlined',
}) => {
  const [field, meta] = useField(fieldName);
  const formik = useFormikContext();
  const [textValue, setTextValue] = useState(meta.value);
  const styleProps = { style: { display: 'inline-block' } };
  const classes = useStyles()();
  if (meta.touched && meta.error != null) {
    styleProps.style.color = 'red';
  }

  // do not update formik until the user has stopped typing for a second, for performance
  useEffect(() => {
    if (meta.value !== textValue) {
      const delayDebounceFn = setTimeout(() => {
        formik.setFieldTouched(field.name, true, false);
        formik.setFieldValue(field.name, textValue, true);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue, field.name]);

  useEffect(() => {
    if (meta.value !== textValue) {
      setTextValue(meta.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.value]);

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
      <TextField
        id={field.name}
        value={textValue}
        variant={variant}
        multiline={multiline}
        fullWidth={fullWidth}
        className={classes.fieldBody}
        autoFocus={autoFocus}
        error={meta.touched && meta.error != null}
        helperText={meta.error}
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
        onBlur={formik.handleBlur}
      />
    </>
  );
};
