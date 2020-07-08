import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useStyles } from '../../../styles/Styles';
import { DatePicker } from '../../datepicker/DatePicker';
import { VACANCY_PRIORITY, VACANCY_ROLE } from '../../../constants/Constants';
import { DropDown } from '../../DropDown';

export const AddEditVacancy = ({ task, vacancy, open, onClose, onConfirm, ...other }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const [localState, setLocalState] = useState(null);
  const [mounted, setMounted] = useState(false);
  const skills = useSelector((state) => state.skills);
  const [dateErrors, setDateErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!mounted) {
      if (vacancy == null) {
        setLocalState({
          id: uuid(),
          recuiterId: currentUser.id,
          startDate: new Date(),
          endDate: new Date(),
          skillId: '',
          priority: '',
          comments: '',
          role: '',
          status: 'Open',
          createdDate: new Date(),
        });
      } else {
        setLocalState(...vacancy);
      }
      setMounted(true);
    }
  }, [vacancy, currentUser, mounted]);

  useEffect(() => {
    if (mounted) {
      const errs = [];
      errs.push(...dateErrors);
      if (localState.skillId === '') {
        errs.push('You must choose a skill.');
      }
      if (localState.priority === '') {
        errs.push('You must specify whether the role is essential or not.');
      }
      if (localState.role === '') {
        errs.push('You must specify a role.');
      }
      setErrors(errs);
    }
  }, [localState, dateErrors, mounted]);

  const onDropDownChange = (id, value) => {
    setLocalState({ ...localState, [id]: value });
  };

  const handleDateError = (err) => {
    setDateErrors(err);
  };

  const onConfirmClicked = () => {
    if (errors.length > 0) {
      setShowErrors(true);
    } else {
      onConfirm(localState);
    }
  };

  return !mounted ? null : (
    <Dialog
      open={open}
      onClose={onClose}
      onEscapeKeyDown={onClose}
      className={classes.editVacancyContainer}
      classes={{ paper: classes.editVacancyPaper }}
      {...other}
    >
      <div className={classes.editVacancyHeader}>
        <Typography variant="body1">
          <b>Vacancy for {task.title}</b>
        </Typography>
      </div>

      <div className={classes.editVacancyBody}>
        <DropDown
          id="skillId"
          prompt="What skill or domain do you need?"
          value={localState.skillId}
          items={skills.map((skill) => ({ label: skill.title, value: skill.id }))}
          onChange={onDropDownChange}
          autoFocus
        />

        <DropDown
          id="role"
          prompt="What role will the person occupy?"
          value={localState.role}
          items={Object.values(VACANCY_ROLE).map((role) => ({ label: role, value: role }))}
          onChange={onDropDownChange}
        />

        <DropDown
          id="priority"
          prompt="Is the role essential for the initiative to succeed?"
          value={localState.priority}
          items={[
            { label: 'Yes', value: VACANCY_PRIORITY.ESSENTIAL },
            { label: 'No', value: VACANCY_PRIORITY.DESIRABLE },
          ]}
          onChange={onDropDownChange}
        />
        <br />
        <DatePicker
          prompt="When do you want to run the Initiative?"
          firstDateLabel="Starting on"
          secondDateLabel="Finishing on"
          initRange={localState}
          inline
          requireBothDates
          onStartDateChange={(value) => setLocalState({ ...localState, startDate: value })}
          onEndDateChange={(value) => setLocalState({ ...localState, endDate: value })}
          onError={handleDateError}
        />

        <TextField
          className={classes.vacancyComments}
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          id="comments"
          label="Comments"
          variant="outlined"
          placeholder="Would you like to further describe the vacancy for applicants?"
          value={localState.comments}
          onChange={(value) => setLocalState({ ...localState, comments: value })}
        />
      </div>

      <Divider />

      {showErrors ? (
        <>
          <div className={classes.editVacancyBody}>
            {errors.map((err, key) => (
              <div key={key} className={classes.errorMsg}>
                <Typography>{err}</Typography>
              </div>
            ))}
          </div>
          <Divider />
        </>
      ) : null}

      <DialogActions>
        <Button onClick={onClose}>Close (does not change anything)</Button>
        <Button onClick={onConfirmClicked} color="primary">
          Confirm Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
