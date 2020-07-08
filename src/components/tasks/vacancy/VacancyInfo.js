import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../../styles/Styles';
import { formatDate } from '../../../util/Dates';
import { capitalize } from '../../../util/String';

const variant = typographyVariant.aag;

export const VacancyInfo = ({ vacancy }) => {
  const classes = useStyles()();

  return (
    <div className={classes.interestVacancyInfoContainer}>
      <Typography variant={'body1'} className={classes.interestVacancyHeader}>
        <b>Vacancy Information</b>
      </Typography>
      <div className={classes.interestVacancyInfoTable}>
        <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
          Skill Group
        </Typography>
        <div className={classes.vacancyValueInner}>
          <Typography variant={variant.value} className={classes.vacancyFieldValue}>
            {capitalize(vacancy.skillTitle)}
          </Typography>
        </div>
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
        <div className={classes.vacancyValueInner}>
          <Typography variant={variant.value} className={classes.vacancyFieldValue}>
            {formatDate(vacancy.startDate)} to {formatDate(vacancy.endDate)}
          </Typography>
        </div>
        <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
          Comments
        </Typography>
        <div className={classes.vacancyValueInner}>
          <Typography variant={variant.value} className={classes.vacancyFieldValue}>
            {vacancy.comments}
          </Typography>
        </div>
      </div>
    </div>
  );
};
