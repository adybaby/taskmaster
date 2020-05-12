import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { VACANCY } from '../../constants/Constants';
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
          <b>{vacancy.skill}</b>
        </Typography>
        <div
          data-open={String(vacancy.status === VACANCY.FIELDS.STATUS.OPEN.id)}
          className={classes.vacancyStatus}
        >
          <Typography variant="caption">
            <b>{VACANCY.getStatusLabel(vacancy.status)}</b>
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
              {VACANCY.getRoleLabel(vacancy.role)}
            </Typography>
          </div>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Priority
          </Typography>
          <div className={classes.vacancyValueInner}>
            <Typography variant={variant.value} className={classes.vacancyFieldValue}>
              {VACANCY.getPriorityLabel(vacancy.priority)}
            </Typography>
          </div>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Dates
          </Typography>
          <div className={classes.vacancyFieldValue}>
            {vacancy.periods.map((period, index) => (
              <div key={index} className={classes.vacancyPeriod}>
                <div className={classes.periodDate}>
                  <Typography variant={variant.value}>
                    {formatDate(period.from)} to {formatDate(period.to)}
                  </Typography>
                  {period.interest.length > 0 ? (
                    <Typography variant={variant.value}>
                      {period.interest.length}{' '}
                      {period.interest.length === 1 ? 'person is' : 'people are'} interested.
                    </Typography>
                  ) : null}
                </div>
                {vacancy.status === VACANCY.FIELDS.STATUS.OPEN.id ? (
                  <Button
                    classes={{ root: classes.vacancySignUpButton }}
                    onClick={handleSignUpClick}
                  >
                    SIGN UP
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
};
