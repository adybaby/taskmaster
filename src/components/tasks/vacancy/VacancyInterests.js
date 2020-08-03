import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useStyles } from '../../../styles/Styles';
import { InterestResponse } from './InterestResponse';
import * as logger from '../../../util/Logger';
import * as db from '../../../db/Db';
import { UserLink } from '../../Link';
import { INTEREST_STATUS, VACANCY_STATUS } from '../../../constants/Constants';
import { formatUserName } from '../../../util/Users';

export const VacancyInterests = ({ vacancy, task, onChanged, onError }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const canSeeInterest =
    vacancy.recruiterId === currentUser.id || task.createdBy === currentUser.id;
  const [currentInterest, setCurrentInterest] = useState(null);

  const [openInterestDialog, setOpenInterestDialog] = useState(false);

  const onResponsesClick = (thisInterest) => {
    setCurrentInterest(thisInterest);
    setOpenInterestDialog(true);
  };

  if (!canSeeInterest || vacancy.interest.length < 1) return null;

  const onClose = () => {
    setOpenInterestDialog(false);
  };

  const onChangeStatus = (accept, close) => {
    const logSuccess = () => logger.debug('Updated Interest.', vacancy.interest);
    const logError = (e) => logger.error('Could not update Interest.', e, vacancy.interest);
    setOpenInterestDialog(false);
    db.upsertInterest({
      ...currentInterest,
      status: accept ? INTEREST_STATUS.ACCEPTED : INTEREST_STATUS.DECLINED,
    })
      .then((updatedInterest) => {
        if (accept) {
          db.upsertVacancy({
            ...vacancy,
            status: close ? VACANCY_STATUS.CLOSED : VACANCY_STATUS.OPEN,
          })
            .then((updateVacancy) => {
              logSuccess();
              onChanged();
            })
            .catch((e) => {
              logError(e);
              onError(e);
            });
        } else {
          logSuccess();
          onChanged();
        }
      })
      .catch((e) => {
        onError(e);
        logError(e);
      });
  };

  return (
    <>
      <div className={classes.vacancyInterestsHeader}>
        <b>Interest</b>
      </div>
      {vacancy.interest.map((thisInterest, key) => (
        <div key={key} className={classes.vacancyInterestContainer}>
          <div>
            <UserLink userId={thisInterest.userId} userName={formatUserName(thisInterest.user)} />
            {` (${thisInterest.status})`}
          </div>
          <Button
            classes={{ root: classes.primaryButton }}
            onClick={() => onResponsesClick(thisInterest)}
          >
            RESPONSES
          </Button>
        </div>
      ))}
      <InterestResponse
        vacancy={vacancy}
        interest={currentInterest}
        open={openInterestDialog}
        onClose={onClose}
        onAcceptAndOpen={() => onChangeStatus(true, false)}
        onAcceptAndClose={() => onChangeStatus(true, true)}
        onDecline={() => onChangeStatus(false)}
      />
    </>
  );
};
