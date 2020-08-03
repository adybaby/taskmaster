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
import { VACANCY_PRIORITY, VACANCY_ROLE, VACANCY_STATUS } from '../../../constants/Constants';
import { DropDown } from '../../DropDown';
import { YesNoDialog } from '../../YesNoDialog';
import { formatUserName } from '../../../util/Users';

export const AddEditVacancy = ({ vacancy, task, open, onClose, onConfirm, onDelete, ...other }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const userOptions = useSelector((state) => state.users).map((user) => ({
    label: formatUserName(user),
    value: user.id,
  }));
  const [localState, setLocalState] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [dateErrors, setDateErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const skills = useSelector((state) => state.skills);

  useEffect(() => {
    if (!mounted) {
      if (vacancy == null) {
        setLocalState({
          id: uuid(),
          recruiterId: currentUser.id,
          startDate: task.startDate,
          endDate: task.endDate,
          skillId: '',
          priority: '',
          comments: '',
          role: '',
          status: 'Preparing',
          taskId: task.id,
          createdDate: new Date(),
        });
      } else {
        setLocalState({ ...vacancy });
      }
      setMounted(true);
    }
  }, [vacancy, currentUser, mounted, task]);

  useEffect(() => {
    if (mounted) {
      const errs = [];
      if (localState.skillId === '') {
        errs.push('You must choose a skill/domain.');
      }
      if (localState.role === '') {
        errs.push('You must specify a role.');
      }
      if (localState.priority === '') {
        errs.push('You must specify whether the role is essential or not.');
      }
      errs.push(...dateErrors);
      setErrors(errs);
    }
  }, [localState, dateErrors, mounted]);

  const onDropDownChange = (id, value) => {
    setLocalState({ ...localState, [id]: value });
  };

  const handleDateError = (err) => {
    setDateErrors(err);
  };

  const onConfirmClick = () => {
    if (errors.length > 0) {
      setShowErrors(true);
    } else {
      onConfirm(localState);
    }
  };

  const onDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const onConfirmDelete = (confirmed) => {
    setConfirmDeleteOpen(false);
    if (confirmed) {
      onDelete();
    }
  };

  const onCancelled = () => {
    setMounted(false);
    onClose();
  };

  return !mounted ? null : (
    <>
      <Dialog
        open={open}
        onClose={onCancelled}
        onEscapeKeyDown={onCancelled}
        className={classes.editVacancyContainer}
        classes={{ paper: classes.editVacancyPaper }}
        {...other}
      >
        <div className={classes.editVacancyHeader}>
          <Typography variant="body1">
            <b>Vacancy for {task.title}</b>
          </Typography>
          {vacancy != null ? (
            <Button className={classes.primaryButtonDense} onClick={onDeleteClick}>
              Delete Vacancy
            </Button>
          ) : null}
        </div>

        <div className={classes.editVacancyId}>
          <Typography variant="body1">ID: {localState.id}</Typography>
        </div>

        <div className={classes.editVacancyBody}>
          <DropDown
            id="status"
            prompt="Status"
            value={localState.status}
            items={Object.values(VACANCY_STATUS).map((status) => ({
              label: status,
              value: status,
            }))}
            onChange={onDropDownChange}
            autoFocus={true}
          />

          <DropDown
            id="recruiterId"
            prompt="Vacancy POC"
            value={localState.recruiterId}
            items={userOptions}
            onChange={onDropDownChange}
          />

          <DropDown
            id="skillId"
            prompt="What skill or domain do you need?"
            value={localState.skillId}
            items={skills.map((skill) => ({ label: skill.title, value: skill.id }))}
            onChange={onDropDownChange}
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
            onChange={(event) => {
              setLocalState({ ...localState, comments: event.target.value });
            }}
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
          <Button onClick={onCancelled}>Close (does not change anything)</Button>
          <Button onClick={onConfirmClick} color="primary">
            Confirm Changes
          </Button>
        </DialogActions>
      </Dialog>
      {confirmDeleteOpen ? (
        <YesNoDialog
          title="Delete Vacancy?"
          msg="Are you sure you want to delete this vacancy and related interests? This can't be undone."
          open={confirmDeleteOpen}
          handleClose={onConfirmDelete}
        />
      ) : null}
    </>
  );
};
