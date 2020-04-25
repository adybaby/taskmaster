import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { styles, typographyVariant } from '../../styles/Styles';
import {
  getPriorityLabel,
  getStatusLabel,
  getInterestStatusLabel,
  getRoleLabel,
} from '../../data/fields/Vacancies';
import { formatDate } from '../../util/Dates';

const useStyles = makeStyles(styles);
const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.vacancyContainer}>
      <div className={classes.vacancyHeading}>
        <Typography variant="body1">
          <b>{vacancy.skill}</b>
        </Typography>
        <div className={classes.vacancyStatus}>
          <Typography variant="caption">
            <b>{getStatusLabel(vacancy.status)}</b>
          </Typography>
        </div>
      </div>
      <div className={classes.vacancyBody}>
        <div className={classes.vacancyFieldsTable}>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Role
          </Typography>
          <Typography variant={variant.value} className={classes.vacancyFieldValue}>
            {getRoleLabel(vacancy.role)}
          </Typography>
          <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
            Priority
          </Typography>
          <Typography variant={variant.value} className={classes.vacancyFieldValue}>
            {getPriorityLabel(vacancy.priority)}
          </Typography>
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
                <Button classes={{ root: classes.vacancySignUpButton }}>SIGN UP</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
};
