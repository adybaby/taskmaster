import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy }) => {
  const classes = useStyles()();

  const handleSignUpClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  return (
    <Paper className={classes.vacancyContainer}>
      <div className={classes.vacancyHeading}>
        <Typography variant="body1">
          <b>{vacancy.skillTitle}</b>
        </Typography>
        <div data-open={String(vacancy.status === 'Open')} className={classes.vacancyStatus}>
          <Typography variant="caption">
            <b>{vacancy.status}</b>
          </Typography>
        </div>
      </div>
      <div className={classes.vacancyBody}>
        <div className={classes.vacancyFieldsTable}>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Role
          </Typography>
          <div className={classes.vacancyValueInner}>
            <Typography variant={variant.value} className={classes.vacancyFieldValue}>
              {vacancy.role}
            </Typography>
          </div>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Priority
          </Typography>
          <div className={classes.vacancyValueInner}>
            <Typography variant={variant.value} className={classes.vacancyFieldValue}>
              {vacancy.priority}
            </Typography>
          </div>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Dates
          </Typography>
          <div className={classes.vacancyFieldValue}>
            <div className={classes.vacancyPeriod}>
              <div className={classes.periodDate}>
                <Typography variant={variant.value}>
                  {formatDate(vacancy.startDate)} to {formatDate(vacancy.endDate)}
                </Typography>
              </div>
              {vacancy.status === 'Open' ? (
                <Button classes={{ root: classes.vacancySignUpButton }} onClick={handleSignUpClick}>
                  SIGN UP
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
