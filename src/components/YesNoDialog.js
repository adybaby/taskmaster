import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

export const YesNoDialog = ({
  title,
  msg,
  yesLabel = 'YES',
  noLabel = 'NO',
  handleClose,
  open,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>{noLabel}</Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          {yesLabel}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
