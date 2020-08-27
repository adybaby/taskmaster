import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  Divider,
} from '@material-ui/core';
import { formatUserName } from '../../util/Users';
import { getHintText, HINT_IDS } from '../hints/Hint';

export const NewTaskDialog = ({ currentUser, onCancel, onConfirm }) => {
  const [type, setType] = useState('INITIATIVE');
  const PERMISSIONS = {
    DRIVER:
      currentUser.permissions.includes('upsertDrivers') ||
      currentUser.permissions.includes('admin'),
    ENABLER:
      currentUser.permissions.includes('upsertEnablers') ||
      currentUser.permissions.includes('admin'),
    INITIATIVE: true,
  };

  const makeOption = (option) => (
    <div
      style={{
        padding: '0 20px 25px 20px',
        background: type === option ? '#f2faff' : 'white',
      }}
    >
      <FormControlLabel
        disabled={!PERMISSIONS[option]}
        style={{ marginTop: '10px' }}
        value={option}
        control={<Radio />}
        label={<b>{option}</b>}
      />
      {!PERMISSIONS[option] ? (
        <Typography style={{ paddingBottom: '20px' }}>
          <i>Contact your administrator or an author of a driver if you need to create a driver.</i>
        </Typography>
      ) : null}
      {getHintText(HINT_IDS[`${option}S`]).map((hintText, key) => (
        <Typography key={key}>{hintText}</Typography>
      ))}
    </div>
  );

  const confirmType = () =>
    onConfirm({
      editors: [currentUser.id],
      editorNames: [{ id: currentUser.id, userName: formatUserName(currentUser) }],
      type,
    });

  if (currentUser.permissions.length === 0) {
    confirmType();
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      aria-labelledby="alert-dialog-newTask"
      aria-describedby="alert-dialog-newTask-description"
    >
      <DialogTitle id="alert-dialog-title">Create New Task</DialogTitle>
      <Divider style={{ marginBottom: '20px' }} />
      <Typography style={{ padding: '0 20px 25px 20px' }}>
        What type of task do you want to create?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="type"
          name="type1"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          {makeOption('DRIVER')}
          {makeOption('ENABLER')}
          {makeOption('INITIATIVE')}
        </RadioGroup>
      </FormControl>

      <Divider style={{ marginTop: '10px' }} />
      <DialogActions>
        <Button onClick={onCancel}>CANCEL</Button>
        <Button onClick={confirmType} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
