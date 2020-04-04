/* eslint-disable no-restricted-globals */
import React, { useState, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { isValid } from 'date-fns';
import DatePicker from './GbDateClearablePicker';
import { styles } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';

const useStyles = makeStyles(styles);

export const DatesDialog = ({ open, handleClose, currentPickerTitle, ...other }) => {
  const classes = useStyles();
  const [dates, setDates] = useState({ from: '', to: '', active: '' });

  const toControl = createRef();

  const bothDatesNull = dates.from === '' && dates.to === '';
  const fromNotValid = dates.from !== '' && isNaN(new Date(dates.from).getTime());
  const toNotValid = dates.to !== '' && isNaN(new Date(dates.to).getTime());
  const datesOutOfOrder =
    dates.from !== '' &&
    dates.to !== '' &&
    new Date(dates.from).getTime() > new Date(dates.to).getTime();

  const handleOk = () => {
    const fromDate = new Date(dates.from);
    const toDate = new Date(dates.to);
    handleClose(isValid(fromDate) ? fromDate : null, isValid(toDate) ? toDate : null);
  };

  const datePickerProps = {
    variant: 'static',
    disableToolbar: true,
    orientation: 'portrait',
    fullWidth: true,
    value: dates[dates.active] === '' ? null : dates[dates.active],
    defaultDate: null,
    onAccept: (date) => {
      if (dates.active === 'from') {
        toControl.current.focus();
        setDates({ ...dates, from: formatDate(date), active: 'to' });
      } else {
        toControl.current.focus();
        setDates({ ...dates, to: formatDate(date), active: 'to' });
      }
    },
    onChange: () => {
      // do nothing
    },
  };

  const inputProps = {
    className: classes.datePickerField,
    fullWidth: true,
    InputProps: {
      classes: {
        root: classes.datePickerInput,
        focused: classes.datePickerInputFocussed,
      },
    },
  };

  const fromProps = {
    onChange: (event) => {
      setDates({ ...dates, from: event.target.value });
    },
    onFocus: () => {
      setDates({ ...dates, active: 'from' });
    },
    autoFocus: true,
    value: dates.from,
    label: `${currentPickerTitle} on or after..`,
    ...inputProps,
  };

  const toProps = {
    onChange: (event) => {
      setDates({ ...dates, to: event.target.value });
    },
    onFocus: () => {
      setDates({ ...dates, active: 'to' });
    },
    value: dates.to,
    label: `${currentPickerTitle} on or before..`,
    inputRef: toControl,
    ...inputProps,
  };

  if (dates.to !== '' && dates.active === 'from') {
    datePickerProps.maxDate = dates.to;
    datePickerProps.initialFocusedDate = dates.to;
  }

  if (dates.from !== null && dates.active === 'to') {
    datePickerProps.minDate = dates.from;
    datePickerProps.initialFocusedDate = dates.from;
  }

  let fromJoinProps = {};
  if (dates.active === 'from') {
    fromJoinProps = { backgroundColor: '#f2f2f2' };
  }
  let toJoinProps = {};
  if (dates.active === 'to') {
    toJoinProps = { backgroundColor: '#f2f2f2' };
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
          <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '2px' }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', ...fromJoinProps }}>
                <TextField {...fromProps} />
                <div style={{ padding: '4px' }}></div>
              </div>
              <div style={{ padding: '8px' }}></div>
              <div style={{ display: 'flex', ...toJoinProps }}>
                <TextField {...toProps} />
                <div style={{ padding: '4px' }}></div>
              </div>
            </div>
            <div>
              <DatePicker {...datePickerProps} />
            </div>
          </div>
          {fromNotValid ? (
            <div style={{ paddingTop: '16px', color: 'red' }}>
              The first date is not a valid date.
            </div>
          ) : null}
          {toNotValid ? (
            <div style={{ paddingTop: '16px', color: 'red' }}>
              The second date is not a valid date.
            </div>
          ) : null}
          {datesOutOfOrder ? (
            <div style={{ paddingTop: '16px', color: 'red' }}>
              The first date should be before or the same as the last date.
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(null, null)}>Cancel</Button>
          <Button
            disabled={fromNotValid || toNotValid || datesOutOfOrder || bothDatesNull}
            onClick={handleOk}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
