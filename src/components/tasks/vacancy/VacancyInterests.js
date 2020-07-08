import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useStyles } from '../../../styles/Styles';
import { InterestResponse } from './InterestResponse';
import { updateInterest } from '../../../state/actions/InterestActions';
import * as logger from '../../../util/Logger';
import { UserLink } from '../../Link';
import { INTEREST_STATUS, VACANCY_STATUS } from '../../../constants/Constants';
import { updateVacancy } from '../../../state/actions/VacancyActions';

export const VacancyInterests = ({ vacancy }) => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const interest = useSelector((state) => state.interest).filter((i) => i.vacancyId === vacancy.id);
  const isRecruiter = vacancy.recruiterId === currentUser.id;
  const users = useSelector((state) => state.users);
  const [currentInterest, setCurrentInterest] = useState(null);

  const [openInterestDialog, setOpenInterestDialog] = useState(false);

  const onResponsesClick = (thisInterest) => {
    setCurrentInterest(thisInterest);
    setOpenInterestDialog(true);
  };

  if (!isRecruiter || interest.length < 1) return null;

  const onClose = () => {
    setOpenInterestDialog(false);
  };

  const onChangeStatus = (accept, close) => {
    const logSuccess = () => logger.debug('Updated Interest.', interest);
    const logError = (e) => logger.error('Could not update Interest.', e, interest);
    setOpenInterestDialog(false);
    dispatch(
      updateInterest(
        {
          ...currentInterest,
          status: accept ? INTEREST_STATUS.ACCEPTED : INTEREST_STATUS.DECLINED,
        },
        () => {
          if (accept) {
            dispatch(
              updateVacancy(
                { ...vacancy, status: close ? VACANCY_STATUS.CLOSED : VACANCY_STATUS.OPEN },
                logSuccess,
                logError
              )
            );
          }
        },
        logError
      )
    );
  };

  return (
    <>
      <div className={classes.vacancyInterestsHeader}>
        <b>Interest</b>
      </div>
      {interest.map((thisInterest, key) => (
        <div key={key} className={classes.vacancyInterestContainer}>
          <div>
            <UserLink
              userId={thisInterest.userId}
              userName={users.find((user) => user.id === thisInterest.userId).formattedFullName}
            />
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
