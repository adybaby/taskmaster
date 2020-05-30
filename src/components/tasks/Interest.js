import React, { useState } from 'react';
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
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { DatesDialog } from '../datesdialog/DateDialog';

const variant = typographyVariant.aag;

export const Interest = ({ vacancy, open, onClose, onConfirm, onWithdraw, ...other }) => {
  const classes = useStyles()();
  const [openDates, setOpenDates] = useState(false);
  const [actionOption, setActionOption] = useState('signUp');
  const [signUpOption, setSignUpOption] = useState('allDates');
  const [comments, setComments] = useState('');
  const [customDates, setCustomDates] = useState({
    startDate: vacancy.startDate,
    endDate: vacancy.endDate,
  });
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const onCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      setSignUpOption('customDates');
      setCustomDates(range);
    }
  };

  const onSignUpOptionChange = (event) => {
    const selected = event.target.value;
    if (selected === 'customDates') {
      setOpenDates(true);
    } else {
      setSignUpOption('allDates');
    }
  };

  const handleConfirm = () => {
    let { startDate, endDate } = vacancy;
    if (signUpOption === 'customDates') {
      startDate = customDates.startDate;
      endDate = customDates.endDate;
    }
    const status = actionOption === 'signUp' ? 'APPLIED' : 'INTERESTED';
    onConfirm({
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
                value="signUp"
                control={<Radio />}
                label="Sign up for the vacancy (you can cancel later if you need to)"
              />
              <Collapse in={actionOption === 'signUp'} timeout="auto" unmountOnExit>
                <div className={classes.interestNestedRadioGroup}>
                  <FormControl component="fieldset" disabled={actionOption !== 'signUp'}>
                    <RadioGroup
                      aria-label="allDatesOrCustomDates"
                      name="allDatesOrCustomDates1"
                      value={signUpOption}
                      onChange={onSignUpOptionChange}
                    >
                      <FormControlLabel
                        value="allDates"
                        control={<Radio />}
                        label={`For the requested dates (${rangeLabel(vacancy)})`}
                      />
                      <FormControlLabel
                        value="customDates"
                        control={<Radio />}
                        label={`For different dates${
                          signUpOption === 'customDates' ? ` (${rangeLabel(customDates)})` : '..'
                        }`}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Collapse>
              <FormControlLabel
                className={classes.interestSignUpOptionRadio}
                value="contactOwner"
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
