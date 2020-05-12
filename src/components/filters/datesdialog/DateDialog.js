import React, { useState, useEffect, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../../styles/Styles';
import DatePicker from './GbDateClearablePicker';
import { DateErrors } from './DateErrors';

import { formatDate, ukToUs, isValidDateString } from '../../../util/Dates';

export const DatesDialog = ({ open, fieldLabel, handleClose, initRange, ...other }) => {
  const classes = useStyles()();
  const CONTROL = { FROM: 'fromStr', TO: 'toStr' };
  const fromControl = createRef();
  const toControl = createRef();
  const [fromStr, setFromStr] = useState('');
  const [toStr, setToStr] = useState('');
  const [target, setTarget] = useState(CONTROL.FROM);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (initRange !== null && typeof initRange !== 'undefined') {
      setFromStr(initRange.from !== null ? formatDate(initRange.from) : '');
      setToStr(initRange.to !== null ? formatDate(initRange.to) : '');
    }
  }, [initRange]);

  const onSubmit = () => {
    const setDateField = (dateStr, setter) => {
      const usDateStr = ukToUs(dateStr);
      let date = null;
      if (isValidDateString(usDateStr)) {
        date = new Date(usDateStr);
        setter(formatDate(date));
      }
      return date;
    };

    handleClose({ from: setDateField(fromStr, setFromStr), to: setDateField(toStr, setToStr) });
  };

  const onCancel = () => {
    handleClose(null);
  };

  const makeDateFieldProps = (id, setter, props) => ({
    fullWidth: true,
    onKeyPress: (event) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    },
    InputProps: {
      classes: {
        root: classes.datePickerInput,
        focused: classes.datePickerInputFocussed,
      },
    },
    onFocus: () => {
      setTarget(id);
    },
    ...props,
  });

  const makeDatePickerProps = (props) => ({
    variant: 'static',
    disableToolbar: true,
    orientation: 'portrait',
    fullWidth: true,
    defaultDate: null,
    onChange: () => {
      // do nothing - component barfs if not provided
    },
    ...props,
  });

  const getDateLimitProp = (dateStr) => {
    const ukStr = ukToUs(dateStr);
    return isValidDateString(ukStr) ? new Date(ukStr) : undefined;
  };

  const dialogBody = (
    <div className={classes.datesDialogBody}>
      <div className={classes.datesDialogInputsWrapper}>
        <div
          data-target={String(target === CONTROL.FROM)}
          className={classes.dateDialogFieldWrapper}
        >
          <TextField
            {...makeDateFieldProps(CONTROL.FROM, setFromStr, {
              value: fromStr,
              label: `${fieldLabel} on or after..`,
              autoFocus: true,
              onChange: (event) => {
                setFromStr(event.target.value);
              },
              inputRef: fromControl,
            })}
          />
        </div>
        <div data-target={String(target === CONTROL.TO)} className={classes.dateDialogFieldWrapper}>
          <TextField
            {...makeDateFieldProps(CONTROL.TO, setToStr, {
              value: toStr,
              label: `${fieldLabel} on or before..`,
              onChange: (event) => {
                setToStr(event.target.value);
              },
              inputRef: toControl,
            })}
          />
        </div>
      </div>
      <div className={classes.dateDialogPickerWrapper}>
        {target === CONTROL.FROM ? (
          <DatePicker
            {...makeDatePickerProps({
              value: fromStr,
              maxDate: getDateLimitProp(toStr),
              onAccept: (date) => {
                setFromStr(formatDate(date));
                toControl.current.focus();
              },
            })}
          />
        ) : (
          <DatePicker
            {...makeDatePickerProps({
              value: toStr,
              minDate: getDateLimitProp(fromStr),
              initialFocusedDate: fromStr !== '' ? fromStr : undefined,
              onAccept: (date) => {
                setToStr(formatDate(date));
                toControl.current.focus();
              },
            })}
          />
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onClose={onCancel} onEscapeKeyDown={onCancel} {...other}>
      <DialogTitle id="date picker title">Filter By Dates</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the date range to filter by. You can leave either field blank to ignore those
          fields.
        </DialogContentText>
        {dialogBody}
        <DateErrors
          fromStr={fromStr}
          toStr={toStr}
          onValidityChange={(allValid) => setValid(allValid)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button disabled={!valid} onClick={onSubmit} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
