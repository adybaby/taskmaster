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
import { useStyles } from '../../../styles/Styles';
import { formatDateRange, equals } from '../../../util/Dates';
import { DatePicker } from '../../datepicker/DatePicker';
import { VacancyInfo } from './VacancyInfo';
import { INTEREST_STATUS } from '../../../constants/Constants';
import { formatUserName } from '../../../util/Users';

export const InterestApplication = ({
  vacancy,
  open,
  onClose,
  onConfirm,
  onWithdraw,
  ...other
}) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const [localState, setLocalState] = useState(null);
  const [openDates, setOpenDates] = useState(false);
  const [customDates, setCustomDates] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [existingApplication, setExistingApplication] = useState(false);
  const [alreadyResponded, setAlreadyResponsed] = useState(false);

  useEffect(() => {
    if (!mounted) {
      const thisInterest = vacancy.interest.find((i) => i.userId === currentUser.id);
      if (!(thisInterest == null)) {
        let status = thisInterest.status;
        if (
          thisInterest.status === INTEREST_STATUS.ACCEPTED ||
          thisInterest.status === INTEREST_STATUS.DECLINED
        ) {
          status = INTEREST_STATUS.APPLYING;
          setAlreadyResponsed(true);
        }
        setLocalState({
          ...thisInterest,
          status,
        });
        setExistingApplication(true);
      } else {
        setLocalState({
          id: uuid(),
          userId: currentUser.id,
          vacancyId: vacancy.id,
          startDate: vacancy.startDate,
          endDate: vacancy.endDate,
          createdDate: new Date(),
          comments: '',
          status: INTEREST_STATUS.APPLYING,
        });
        setExistingApplication(false);
      }
      setMounted(true);
    }
  }, [currentUser, vacancy, mounted]);

  useEffect(() => {
    if (mounted) {
      setCustomDates(
        !(
          equals(vacancy.startDate, localState.startDate) &&
          equals(vacancy.endDate, localState.endDate)
        )
      );
    }
  }, [localState, vacancy, mounted]);

  const onCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      setLocalState({ ...localState, startDate: range.startDate, endDate: range.endDate });
      setCustomDates(true);
    } else {
      setCustomDates(false);
    }
  };

  const setCustomDatesSelected = (selected) => {
    setCustomDates(selected);
    setOpenDates(selected);
  };

  return !mounted ? null : (
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
        <div className={classes.interestControlsContainer}>
          {alreadyResponded ? (
            <div className={classes.alreadyRespondedNote}>
              <Typography variant="body1">
                <b>
                  The recruiter has already responsed to your application. If you change it, the
                  recruiter will need to respond again.
                </b>
              </Typography>
            </div>
          ) : null}
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="signUpOrContactOwner"
              name="signUpOrContactOwner1"
              value={localState.status}
              onChange={(event) => setLocalState({ ...localState, status: event.target.value })}
            >
              <FormControlLabel
                className={classes.interestSignUpOptionRadio}
                value={INTEREST_STATUS.APPLYING}
                control={<Radio />}
                label="Sign up for the vacancy (you can cancel later if you need to)"
              />
              <Collapse
                in={localState.status === INTEREST_STATUS.APPLYING}
                timeout="auto"
                unmountOnExit
              >
                <div className={classes.interestNestedRadioGroup}>
                  <FormControl
                    component="fieldset"
                    disabled={localState.status !== INTEREST_STATUS.APPLYING}
                  >
                    <RadioGroup
                      aria-label="allDatesOrCustomDates"
                      name="allDatesOrCustomDates1"
                      value={customDates}
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label={`For the requested dates (${formatDateRange(vacancy)})`}
                        onClick={() => setCustomDatesSelected(false)}
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label={`For different dates${
                          customDates ? ` (${formatDateRange(localState)})` : '..'
                        }`}
                        onClick={() => setCustomDatesSelected(true)}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Collapse>
              <FormControlLabel
                className={classes.interestSignUpOptionRadio}
                value={INTEREST_STATUS.CONTACTING}
                control={<Radio />}
                label={`Contact the recruiter (${formatUserName(
                  vacancy.recruiter
                )}) to talk about the vacancy (does not sign you up)`}
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
            value={localState.comments}
            onChange={(event) => setLocalState({ ...localState, comments: event.target.value })}
          />
        </div>
        <Divider />
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {existingApplication ? (
            <Button onClick={() => onWithdraw(localState.id)}>Withdraw Sign-up</Button>
          ) : null}
          <Button onClick={() => onConfirm(localState)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DatePicker
        open={openDates}
        prompt="Which dates can you sign up for?"
        firstDateLabel={`Join on this date`}
        secondDateLabel={`Leave on this date`}
        handleClose={onCloseDatesDialog}
        initRange={localState}
        requireBothDates
      />
    </>
  );
};
