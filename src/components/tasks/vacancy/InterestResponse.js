import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from '../../../styles/Styles';
import { VacancyInfo } from './VacancyInfo';
import { InterestInfo } from './InterestInfo';
import { INTEREST_STATUS } from '../../../constants/Constants';

export const InterestResponse = ({
  vacancy,
  interest,
  open,
  onClose,
  onAcceptAndOpen,
  onAcceptAndClose,
  onDecline,
  ...other
}) => {
  const classes = useStyles()();
  const users = useSelector((state) => state.users);

  if (vacancy == null || interest == null) return null;

  const applicant = users.find((u) => u.id === interest.userId);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        onEscapeKeyDown={onClose}
        className={classes.interestDialogContainer}
        classes={{ paper: classes.interestDialogPaper }}
        {...other}
      >
        <div className={classes.interestDialogHeader}>
          <Typography variant="body1">
            <b>What do you want to do?</b>
          </Typography>
        </div>
        <VacancyInfo vacancy={vacancy} />
        <Divider />
        <InterestInfo vacancy={vacancy} interest={interest} />
        <Divider />
        <div className={classes.interestButtons}>
          <Button classes={{ root: classes.interestButton }} onClick={onClose}>
            Close (does not change anything)
          </Button>
          <Button
            classes={{ root: classes.interestButton }}
            color="primary"
            onClick={() => {
              window.open(`mailto:${applicant.emailAddress}`, '_blank');
            }}
          >
            EMAIL {applicant.firstNames[0]}
          </Button>
          {interest.status !== INTEREST_STATUS.DECLINED ? (
            <Button
              classes={{ root: classes.interestButton }}
              onClick={() => onDecline()}
              color="primary"
            >
              Decline Application
            </Button>
          ) : null}
          {interest.status !== INTEREST_STATUS.ACCEPTED ? (
            <Button
              classes={{ root: classes.interestButton }}
              onClick={() => onAcceptAndOpen()}
              color="primary"
            >
              Accept Application {'&'} Keep Vacancy Open
            </Button>
          ) : null}
          {interest.status !== INTEREST_STATUS.ACCEPTED ? (
            <Button
              classes={{ root: classes.interestButton }}
              onClick={() => onAcceptAndClose()}
              color="primary"
            >
              Accept Application {'&'} Close Vacancy
            </Button>
          ) : null}
        </div>
      </Dialog>
    </>
  );
};
