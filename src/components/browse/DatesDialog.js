import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export const DatesDialog = ({ open, handleClose, currentPickerTitle, ...other }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const datePickerProps = {
    clearable: true,
    fullWidth: true,
    format: 'dd/MM/yyyy',
    placeholder: 'Enter a date or leave blank..',
    autoOk: true,
  };

  const fromProps = {
    onChange: (date) => setFrom(date),
    autoFocus: true,
    value: from,
    label: `${currentPickerTitle} on or after..`,
    ...datePickerProps,
  };

  const toProps = {
    onChange: (date) => setTo(date),
    value: to,
    label: `${currentPickerTitle} on or before..`,
    ...datePickerProps,
  };

  if (to !== null) {
    fromProps.maxDate = to;
    fromProps.initialFocusedDate = to;
  }

  if (from !== null) {
    toProps.minDate = from;
    toProps.initialFocusedDate = from;
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={() => handleClose(null, null)}
        {...other}
      >
        <DialogTitle id="form-dialog-title">Filter By Date Range</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the date range to filter by. You can leave either field blank to ignore those
            fields.
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker {...fromProps} />
            <br />
            <br />
            <KeyboardDatePicker {...toProps} />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(null, null)}>Cancel</Button>
          <Button onClick={() => handleClose(from, to)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
