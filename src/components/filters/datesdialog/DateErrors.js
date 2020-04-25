import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { styles, typographyVariant } from '../../../styles/Styles';
import { isValidDateString, ukToUs, beforeOrE } from '../../../util/Dates';

const useStyles = makeStyles(styles);

export const DateErrors = ({ fromStr, toStr, onValidityChange }) => {
  const classes = useStyles();
  const variant = typographyVariant.datesDialog;

  const fieldValid = React.useCallback(
    (field) => field === '' || isValidDateString(ukToUs(field)),
    []
  );

  const orderValid = React.useCallback(
    () =>
      fromStr === '' ||
      toStr === '' ||
      beforeOrE(new Date(ukToUs(fromStr)), new Date(ukToUs(toStr))),
    [fromStr, toStr]
  );

  const eitherValid = React.useCallback(
    () => isValidDateString(ukToUs(fromStr)) || isValidDateString(ukToUs(toStr)),
    [fromStr, toStr]
  );

  const allValid = React.useCallback(
    () => fieldValid(fromStr) && fieldValid(toStr) && orderValid() && eitherValid(),
    [fromStr, toStr, fieldValid, orderValid, eitherValid]
  );

  useEffect(() => {
    onValidityChange(allValid);
  }, [allValid, onValidityChange]);

  return allValid() ? null : (
    <>
      {!fieldValid(fromStr) ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>The first date is not a valid date.</Typography>
        </div>
      ) : null}
      {!fieldValid(toStr) ? (
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
