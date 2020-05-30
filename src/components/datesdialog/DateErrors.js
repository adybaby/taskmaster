import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { isValidDateString, ukToUs, beforeOrE } from '../../util/Dates';

export const DateErrors = ({ startDateStr, endDateStr, onValidityChange, requireBothDates }) => {
  const classes = useStyles()();
  const variant = typographyVariant.datesDialog;

  const fieldValid = React.useCallback(
    (field) => field === '' || isValidDateString(ukToUs(field)),
    []
  );

  const orderValid = React.useCallback(
    () =>
      startDateStr === '' ||
      endDateStr === '' ||
      beforeOrE(new Date(ukToUs(startDateStr)), new Date(ukToUs(endDateStr))),
    [startDateStr, endDateStr]
  );

  const eitherValid = React.useCallback(
    () => isValidDateString(ukToUs(startDateStr)) || isValidDateString(ukToUs(endDateStr)),
    [startDateStr, endDateStr]
  );

  const bothValid = React.useCallback(
    () => isValidDateString(ukToUs(startDateStr)) && isValidDateString(ukToUs(endDateStr)),
    [startDateStr, endDateStr]
  );

  const allValid = React.useCallback(
    () =>
      fieldValid(startDateStr) &&
      fieldValid(endDateStr) &&
      orderValid() &&
      ((!requireBothDates && eitherValid()) || bothValid()),
    [startDateStr, endDateStr, fieldValid, orderValid, eitherValid, bothValid, requireBothDates]
  );

  useEffect(() => {
    onValidityChange(allValid);
  }, [allValid, onValidityChange]);

  return allValid() ? null : (
    <>
      {!fieldValid(startDateStr) ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>The first date is not a valid date.</Typography>
        </div>
      ) : null}
      {!bothValid() && requireBothDates ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>
            You must enter both a start and an end date .
          </Typography>
        </div>
      ) : null}
      {!fieldValid(endDateStr) ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>The second date is not a valid date.</Typography>
        </div>
      ) : null}
      {!orderValid() ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>
            The first date should be before or the same as the last date.
          </Typography>
        </div>
      ) : null}
    </>
  );
};
