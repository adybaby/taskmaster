import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { Interest } from './Interest';
import { addInterest, deleteInterest } from '../../state/actions/InterestActions';
import * as logger from '../../util/Logger';

const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();

  const [openInterestDialog, setOpenInterestDialog] = useState(false);

  const onMoreClick = () => {
    setOpenInterestDialog(true);
  };

  const onInterestWithdrawn = (id) => {
    // delete the interest and notify owner
    setOpenInterestDialog(false);
    dispatch(
      deleteInterest(
        id,
        () => logger.debug(`Deleted Interest:${id}`),
        (e) => logger.error(`Could not delete Interest${id}`, e)
      )
    );
  };

  const onCloseInterestDialog = () => {
    setOpenInterestDialog(false);
  };

  const onInterestConfirmed = (interest) => {
    setOpenInterestDialog(false);
    dispatch(
      addInterest(
        interest,
        () => logger.debug('Added Interest.', interest),
        (e) => logger.error('Could not add INterest.', e, interest)
      )
    );
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
