import React, { useState, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../../../styles/Styles';
import DatePicker from './GbDateClearablePicker';
import { DateErrors } from './DateErrors';

import { formatDate, ukToUs, isValidDateString } from '../../../util/Dates';

const useStyles = makeStyles(styles);

export const DatesDialog = ({ open, fieldLabel, handleClose, ...other }) => {
  const classes = useStyles();
  const CONTROL = { FROM: 'fromStr', TO: 'toStr' };
  const fromControl = createRef();
  const toControl = createRef();
  const [fromStr, setFromStr] = useState('');
  const [toStr, setToStr] = useState('');
  const [focussed, setFocussed] = useState(CONTROL.FROM);
  const [valid, setValid] = useState(true);

  const setDateField = (dateStr, setter) => {
    const usDateStr = ukToUs(dateStr);
    let date = null;
    if (isValidDateString(usDateStr)) {
      date = new Date(usDateStr);
      setter(formatDate(date));
    }
    return date;
  };

  const onSubmit = () => {
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
      setFocussed(id);
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
        <div className={classes.dateDialogFieldWrapper}>
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
        <div className={classes.dateDialogFieldWrapper}>
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
      <div
        className={classes.dateDialogPickerWrapper}
        onFocus={() => {
          switch (focussed) {
            case CONTROL.FROM: {
              fromControl.current.focus();
              break;
            }
            case CONTROL.TO: {
              toControl.current.focus();
              break;
            }
            default: // do nothing
          }
        }}
      >
        {focussed === CONTROL.FROM ? (
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
