import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { Interest } from './Interest';

const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy }) => {
  const classes = useStyles()();

  const [openInterestDialog, setOpenInterestDialog] = useState(false);

  const onMoreClick = () => {
    setOpenInterestDialog(true);
  };

  const onInterestWithdrawn = () => {
    // delete the interest and notify owner
    setOpenInterestDialog(false);
  };

  const onCloseInterestDialog = () => {
    setOpenInterestDialog(false);
  };

  const onInterestConfirmed = (interest) => {
    console.log(interest);
    setOpenInterestDialog(false);
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <>
      <Paper className={classes.vacancyContainer}>
        <div className={classes.vacancyHeading}>
          <Typography variant="body1">
            <b>{capitalize(vacancy.skillTitle)}</b>
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
                  <Button classes={{ root: classes.vacancySignUpButton }} onClick={onMoreClick}>
                    MORE
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <Interest
        vacancy={vacancy}
        open={openInterestDialog}
        onClose={onCloseInterestDialog}
        onConfirm={onInterestConfirmed}
        onWithdraw={onInterestWithdrawn}
      />
    </>
  );
};
