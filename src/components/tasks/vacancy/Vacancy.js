import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../../styles/Styles';
import { formatDate } from '../../../util/Dates';
import { InterestApplication } from './InterestApplication';
import * as logger from '../../../util/Logger';
import * as db from '../../../db/Db';
import { capitalize } from '../../../util/String';
import { VacancyInterests } from './VacancyInterests';
import { VACANCY_STATUS, INTEREST_STATUS } from '../../../constants/Constants';
import { AddEditVacancy } from './AddEditVacancy';
import { formatUserName } from '../../../util/Users';

const variant = typographyVariant.aag;

export const Vacancy = ({ vacancy, task, onChanged, onError }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const canEdit = vacancy.recruiterId === currentUser.id || task.createdBy === currentUser.id;
  const [openInterestDialog, setOpenInterestDialog] = useState(false);
  const [addEditVacancyOpen, setAddEditVacancyOpen] = useState(false);
  const currentUserInterest = vacancy.interest.find((i) => i.userId === currentUser.id);

  const onInterestActionsClick = () => {
    setOpenInterestDialog(true);
  };

  const onCloseInterestDialog = () => {
    setOpenInterestDialog(false);
  };

  const onInterestConfirmed = (interest) => {
    setOpenInterestDialog(false);
    db.upsertInterest(interest)
      .then(() => {
        logger.debug('Added/Updated Interest.', interest);
        onChanged();
      })
      .catch((e) => logger.error('Could not add Interest.', e, interest));
  };

  const onInterestWithdrawn = (id) => {
    setOpenInterestDialog(false);
    db.deleteOne(db.TYPE.INTEREST, id)
      .then(() => {
        logger.debug(`Deleted Interest: ${id}`);
        onChanged();
      })
      .catch((e) => {
        logger.error(`Could not delete Interest ${id}`, e);
        onError(e);
      });
  };

  const onChangeVacancyClick = () => {
    setAddEditVacancyOpen(true);
  };

  const onCloseAddEditVacancyDialog = () => {
    setAddEditVacancyOpen(false);
  };

  const onEditVacancyConfirmed = (vacancyChanges) => {
    setAddEditVacancyOpen(false);
    db.upsertVacancy(vacancyChanges)
      .then(() => {
        logger.debug('Updated Vacancy.', vacancyChanges);
        onChanged();
      })
      .catch((e) => {
        logger.error('Could not update Vacancy.', e, vacancyChanges);
        onError(e);
      });
  };

  const onDeleteVacancyConfirmed = () => {
    setAddEditVacancyOpen(false);
    db.deleteOne(db.TYPE.VACANCY, vacancy.id)
      .then(() => {
        logger.debug(`Deleted vacancy:${vacancy.id}`);
        onChanged();
      })
      .catch((e) => {
        logger.error(`Could not delete vacancy ${vacancy.id}`, e);
        onError(e);
      });
  };

  const getInterestStatusDescription = () => {
    if (currentUserInterest == null) return null;

    let label = null;

    switch (currentUserInterest.status) {
      case INTEREST_STATUS.CONTACTING:
        label = 'You have asked to speak to the recruiter';
        break;
      case INTEREST_STATUS.APPLYING:
        label = 'You have applied for the vacancy';
        break;
      case INTEREST_STATUS.ACCEPTED:
        label = 'You have been accepted for this vacancy';
        break;
      case INTEREST_STATUS.DECLINED:
        label = 'The recruiter has declined your application';
        break;
      default:
        break;
    }

    return (
      <Typography variant={variant.value} style={{ width: '100%' }}>
        <b>{label}</b>
      </Typography>
    );
  };

  const getInterestOptions = () => {
    if (currentUserInterest != null)
      return (
        <Button classes={{ root: classes.filledButton }} onClick={onInterestActionsClick}>
          EDIT YOUR INTEREST..
        </Button>
      );
    return vacancy.status === VACANCY_STATUS.OPEN ? (
      <Button classes={{ root: classes.filledButton }} onClick={onInterestActionsClick}>
        INTERESTED?
      </Button>
    ) : null;
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
          {canEdit ? (
            <Button classes={{ root: classes.primaryButton }} onClick={onChangeVacancyClick}>
              CHANGE..
            </Button>
          ) : null}
        </div>
        <div className={classes.vacancyBody}>
          <div className={classes.vacancyFieldsTable}>
            <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
              ID
            </Typography>
            <div className={classes.vacancyValueInner}>
              <Typography variant={variant.value} className={classes.vacancyFieldValue}>
                {vacancy.id}
              </Typography>
            </div>

            <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
              Created on
            </Typography>
            <div className={classes.vacancyValueInner}>
              <Typography variant={variant.value} className={classes.vacancyFieldValue}>
                {formatDate(vacancy.createdDate)}
              </Typography>
            </div>

            <Typography variant={variant.title} className={classes.vacancyFieldTitle}>
              POC
            </Typography>
            <div className={classes.vacancyValueInner}>
              <Typography variant={variant.value} className={classes.vacancyFieldValue}>
                {formatUserName(vacancy.recruiter)}
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
            <div className={classes.vacancyFieldValue}>
              <div className={classes.vacancyPeriod}>
                <div className={classes.periodDate}>
                  <Typography style={{ width: '100%' }} variant={variant.value}>
                    {formatDate(vacancy.startDate)} to {formatDate(vacancy.endDate)}
                  </Typography>
                  {getInterestStatusDescription()}
                </div>
                {getInterestOptions()}
              </div>
            </div>
          </div>
        </div>
        <VacancyInterests vacancy={vacancy} task={task} onChanged={onChanged} onError={onError} />
      </Paper>

      <AddEditVacancy
        task={task}
        vacancy={vacancy}
        open={addEditVacancyOpen}
        onClose={onCloseAddEditVacancyDialog}
        onConfirm={onEditVacancyConfirmed}
        onDelete={onDeleteVacancyConfirmed}
      />

      <InterestApplication
        vacancy={vacancy}
        open={openInterestDialog}
        onClose={onCloseInterestDialog}
        onConfirm={onInterestConfirmed}
        onWithdraw={onInterestWithdrawn}
      />
    </>
  );
};
