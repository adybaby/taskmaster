/* eslint-disable no-restricted-globals */
import React, { useState, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { isValid } from 'date-fns';
import DatePicker from './GbDateClearablePicker';
import { styles } from '../../../styles/Styles';
import { formatDate } from '../../../util/Dates';
import { dialogBase } from './DialogBase';

const useStyles = makeStyles(styles);

export const DatesDialog = ({ open, handleClose, currentPickerTitle, ...other }) => {
  const classes = useStyles();
  const [dates, setDates] = useState({ from: '', to: '', active: '' });

  const toControl = createRef();

  const bothDatesBlank = dates.from === '' && dates.to === '';
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

  if (dates.from !== '' && dates.active === 'to') {
    datePickerProps.minDate = dates.from;
    datePickerProps.initialFocusedDate = dates.from;
  }

  const dialogBody = (
    <div className={classes.datesDialogBody}>
      <div className={classes.datesDialogInputsWrapper}>
        <div className={dates.active === 'from' ? classes.datesDialogInputBg : undefined}>
          <TextField {...fromProps} />
          <div className={classes.datesDialogJoiner}></div>
        </div>
        <div className={dates.active === 'to' ? classes.datesDialogInputBg : undefined}>
          <TextField {...toProps} />
          <div className={classes.datesDialogJoiner}></div>
        </div>
      </div>
      <div className={classes.datePickerField}>
        <DatePicker {...datePickerProps} />
      </div>
    </div>
  );

  return (
    <div>
      {dialogBase(
        'date',
        dialogBody,
        fromNotValid,
        toNotValid,
        datesOutOfOrder,
        bothDatesBlank,
        open,
        handleClose,
        handleOk,
        classes,
        other
      )}
    </div>
  );
};
