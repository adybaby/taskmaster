import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Collapse,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate, equals } from '../../util/Dates';
import { DatesDialog } from '../datesdialog/DateDialog';

const variant = typographyVariant.aag;

const ACTION_OPTIONS = {
  APPLY: 'APPLY',
  CONTACT_OWNER: 'CONTACT_OWNER',
};

const SIGNUP_OPTIONS = {
  ALL_DATES: 'ALL_DATES',
  CUSTOM_DATES: 'CUSTOM_DATES',
};

const STATUS_OPTIONS = {
  CONTACTED: 'CONTACTED',
  APPLIED: 'APPLIED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
};

export const Interest = ({ vacancy, open, onClose, onConfirm, onWithdraw, ...other }) => {
  const classes = useStyles()();
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const interest = useSelector((state) => state.interest).filter(
    (i) => i.vacancyId === vacancy.id && i.userId === currentUser.id
  );
  const [actionOption, setActionOption] = useState(ACTION_OPTIONS.APPLY);
  const [signUpOption, setSignUpOption] = useState(SIGNUP_OPTIONS.ALL_DATES);
  const [comments, setComments] = useState('');
  const [customDates, setCustomDates] = useState({
    startDate: vacancy.startDate,
    endDate: vacancy.endDate,
  });
  const [openDates, setOpenDates] = useState(false);

  useEffect(() => {
    if (interest !== null) {
      if (
        equals(vacancy.startDate, interest.startDate) &&
        equals(vacancy.endDate, interest.endDate)
      ) {
        setSignUpOption(SIGNUP_OPTIONS.ALL_DATES);
      } else {
        setSignUpOption(SIGNUP_OPTIONS.CUSTOM_DATES);
        setCustomDates({ startDate: interest.startDate, endDate: interest.endDate });
      }
      setComments(interest.comments);
      setActionOption(
        interest.status === STATUS_OPTIONS.CONTACTED
          ? ACTION_OPTIONS.CONTACT_OWNER
          : ACTION_OPTIONS.APPLY
      );
    }
  }, [interest, vacancy]);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const onCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      setSignUpOption(SIGNUP_OPTIONS.CUSTOM_DATES);
      setCustomDates(range);
    }
  };

  const onSignUpOptionChange = (event) => {
    const selected = event.target.value;
    if (selected === SIGNUP_OPTIONS.CUSTOM_DATES) {
      setOpenDates(true);
    } else {
      setSignUpOption(SIGNUP_OPTIONS.ALL_DATES);
    }
  };

  const handleConfirm = () => {
    let { startDate, endDate } = vacancy;
    if (signUpOption === SIGNUP_OPTIONS.CUSTOM_DATES) {
      startDate = customDates.startDate;
      endDate = customDates.endDate;
    }
    const status =
      actionOption === ACTION_OPTIONS.APPLY ? STATUS_OPTIONS.APPLIED : STATUS_OPTIONS.CONTACTED;
    onConfirm({
      id: interest === null ? uuid() : interest.id,
      userId: currentUser.id,
      vacancyId: vacancy.id,
      startDate,
      endDate,
      status,
      comments,
    });
  };

  const rangeLabel = (range) => `${formatDate(range.startDate)} to ${formatDate(range.endDate)}`;

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
        <Divider />
        <div className={classes.interestControlsContainer}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="signUpOrContactOwner"
              name="signUpOrContactOwner1"
              value={actionOption}
              onChange={(event) => setActionOption(event.target.value)}
            >
              <FormControlLabel
                className={classes.interestSignUpOptionRadio}
                value={ACTION_OPTIONS.APPLY}
                control={<Radio />}
                label="Sign up for the vacancy (you can cancel later if you need to)"
              />
              <Collapse in={actionOption === ACTION_OPTIONS.APPLY} timeout="auto" unmountOnExit>
                <div className={classes.interestNestedRadioGroup}>
                  <FormControl
                    component="fieldset"
                    disabled={actionOption !== ACTION_OPTIONS.APPLY}
                  >
                    <RadioGroup
                      aria-label="allDatesOrCustomDates"
                      name="allDatesOrCustomDates1"
                      value={signUpOption}
                      onChange={onSignUpOptionChange}
                    >
                      <FormControlLabel
                        value={SIGNUP_OPTIONS.ALL_DATES}
                        control={<Radio />}
                        label={`For the requested dates (${rangeLabel(vacancy)})`}
                      />
                      <FormControlLabel
                        value={SIGNUP_OPTIONS.CUSTOM_DATES}
                        control={<Radio />}
                        label={`For different dates${
                          signUpOption === SIGNUP_OPTIONS.CUSTOM_DATES
                            ? ` (${rangeLabel(customDates)})`
                            : '..'
                        }`}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Collapse>
              <FormControlLabel
                className={classes.interestSignUpOptionRadio}
                value={ACTION_OPTIONS.CONTACT_OWNER}
                control={<Radio />}
                label={`Contact the recruiter (${
                  users.find((user) => user.id === vacancy.recruiterId).formattedName
                }) to talk about the vacancy (does not sign you up)`}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            className={classes.interestComments}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            id="comments"
            label="Comments"
            variant="outlined"
            placeholder="Enter any comments you want to send with your request here"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
          />
        </div>
        <Divider />
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onWithdraw}>Withdraw Sign-up</Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DatesDialog
        open={openDates}
        prompt="Which dates can you sign up for?"
        firstDateLabel={`Join on this date`}
        secondDateLabel={`Leave on this date`}
        handleClose={onCloseDatesDialog}
        initRange={customDates}
        requireBothDates
      />
    </>
  );
};
