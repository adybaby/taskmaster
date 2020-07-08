import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../../styles/Styles';
import { formatDate } from '../../../util/Dates';
import { InterestApplication } from './InterestApplication';
import { updateInterest, deleteInterest } from '../../../state/actions/InterestActions';
import { deleteVacancy } from '../../../state/actions/VacancyActions';
import * as logger from '../../../util/Logger';
import { capitalize } from '../../../util/String';
import { VacancyInterests } from './VacancyInterests';
import { YesNoDialog } from '../../YesNoDialog';
import { VACANCY_STATUS } from '../../../constants/Constants';

const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const isRecruiter = vacancy.id === currentUser.id;
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const [openInterestDialog, setOpenInterestDialog] = useState(false);

  const onActionsClick = () => {
    setOpenInterestDialog(true);
  };

  const onInterestWithdrawn = (id) => {
    setOpenInterestDialog(false);
    dispatch(
      deleteInterest(
        id,
        () => logger.debug(`Deleted Interest:${id}`),
        (e) => logger.error(`Could not delete Interest${id}`, e)
      )
    );
  };

  const onDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteVacancy = (confirmed) => {
    setConfirmDeleteOpen(false);
    if (confirmed) {
      dispatch(
        deleteVacancy(
          vacancy.id,
          () => logger.debug(`Deleted vacancy:${vacancy.id}`),
          (e) => logger.error(`Could not delete vacancy${vacancy.id}`, e)
        )
      );
    }
  };

  const onCloseInterestDialog = () => {
    setOpenInterestDialog(false);
  };

  const onInterestConfirmed = (interest) => {
    setOpenInterestDialog(false);
    dispatch(
      updateInterest(
        interest,
        () => logger.debug('Added Interest.', interest),
        (e) => logger.error('Could not add Interest.', e, interest)
      )
    );
  };

  return (
    <>
      <Paper className={classes.vacancyContainer}>
        <div className={classes.vacancyHeading}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="body1">
              <b>{capitalize(vacancy.skillTitle)}</b>
            </Typography>
            <div
              data-open={String(vacancy.status === VACANCY_STATUS.OPEN)}
              className={classes.vacancyStatus}
            >
              <Typography variant="caption">
                <b>{vacancy.status}</b>
              </Typography>
            </div>
          </div>
          <Button classes={{ root: classes.primaryButton }} onClick={onDeleteClick}>
            DELETE
          </Button>
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
                {vacancy.status === VACANCY_STATUS.OPEN && !isRecruiter ? (
                  <Button classes={{ root: classes.filledButton }} onClick={onActionsClick}>
                    INTEREST
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <VacancyInterests vacancy={vacancy} />
      </Paper>
      <InterestApplication
        vacancy={vacancy}
        open={openInterestDialog}
        onClose={onCloseInterestDialog}
        onConfirm={onInterestConfirmed}
        onWithdraw={onInterestWithdrawn}
      />
      {confirmDeleteOpen ? (
        <YesNoDialog
          title="Delete Vacancy?"
          msg="Are you sure you want to delete this vacancy and related interests? This can't be undone."
          open={confirmDeleteOpen}
          handleClose={handleDeleteVacancy}
        />
      ) : null}
    </>
  );
};
