import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, typographyVariant } from '../styles/Styles';

export const GeneralError = ({ errorMsg, errorDetailsMsg }) => {
  const classes = useStyles()();
  const variant = typographyVariant.error;

  return (
    <div className={classes.generalError}>
      <Typography className={classes.generalErrorTitle} variant={variant.title}>
        {errorMsg}
      </Typography>
      <Typography variant={variant.details}>
        <b>Details of the error are: </b>
        {errorDetailsMsg}
      </Typography>
    </div>
  );
};
