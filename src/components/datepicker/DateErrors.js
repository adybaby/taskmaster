import React, { useEffect, useState, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { isValidDateString, ukToUs, beforeOrE } from '../../util/Dates';

export const DateErrors = ({
  startDateStr,
  endDateStr,
  onValidityChange,
  requireBothDates,
  showErrors = true,
}) => {
  const classes = useStyles()();
  const variant = typographyVariant.datesDialog;
  const [errors, setErrors] = useState([]);

  const fieldValid = useCallback((field) => field === '' || isValidDateString(ukToUs(field)), []);

  const orderValid = useCallback(
    () =>
      startDateStr === '' ||
      endDateStr === '' ||
      beforeOrE(new Date(ukToUs(startDateStr)), new Date(ukToUs(endDateStr))),
    [startDateStr, endDateStr]
  );

  const bothValid = useCallback(
    () => isValidDateString(ukToUs(startDateStr)) && isValidDateString(ukToUs(endDateStr)),
    [startDateStr, endDateStr]
  );

  const atLeastOneDate = useCallback(
    () =>
      !(startDateStr == null && endDateStr == null) && !(startDateStr === '' && endDateStr === ''),
    [startDateStr, endDateStr]
  );

  useEffect(() => {
    const errs = [];
    if (!fieldValid(startDateStr)) errs.push('The first date is not a valid date.');
    if (!bothValid() && requireBothDates) errs.push('You must enter both a start and an end date.');
    if (!fieldValid(endDateStr)) errs.push('The second date is not a valid date.');
    if (!orderValid()) errs.push('The first date should be before or the same as the last date.');
    if (!requireBothDates && !atLeastOneDate()) errs.push('You must provide at least one date');
    setErrors(errs);
  }, [
    endDateStr,
    startDateStr,
    fieldValid,
    orderValid,
    bothValid,
    atLeastOneDate,
    requireBothDates,
  ]);

  useEffect(() => {
    onValidityChange(errors);
  }, [errors, onValidityChange]);

  if (!showErrors) return null;

  return errors.map((err, key) => (
    <div key={key} className={classes.errorMsg}>
      <Typography variant={variant.error}>{err}</Typography>
    </div>
  ));
};