import React, { useState, useEffect, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useStyles } from '../../styles/Styles';
import DatePicker from './GbDateClearablePicker';
import { DateErrors } from './DateErrors';

import { formatDate, ukToUs, isValidDateString } from '../../util/Dates';

export const DatesDialog = ({
  open,
  prompt,
  firstDateLabel,
  secondDateLabel,
  handleClose,
  initRange,
  requireBothDates,
  ...other
}) => {
  const classes = useStyles()();
  const CONTROL = { START_DATE: 'startDateStr', END_DATE: 'endDateStr' };
  const startDateControl = createRef();
  const endDateControl = createRef();
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');
  const [target, setTarget] = useState(CONTROL.START_DATE);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (initRange !== null && typeof initRange !== 'undefined') {
      setStartDateStr(initRange.startDate !== null ? formatDate(initRange.startDate) : '');
      setEndDateStr(initRange.endDate !== null ? formatDate(initRange.endDate) : '');
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

    handleClose({
      startDate: setDateField(startDateStr, setStartDateStr),
      endDate: setDateField(endDateStr, setEndDateStr),
    });
  };

  const onCancel = () => {
    handleClose(null);
  };

  const makeDateFieldProps = (id, props) => ({
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
          data-target={String(target === CONTROL.START_DATE)}
          className={classes.dateDialogFieldWrapper}
        >
          <TextField
            {...makeDateFieldProps(CONTROL.START_DATE, {
              value: startDateStr,
              label: firstDateLabel,
              autoFocus: true,
              onChange: (event) => {
                setStartDateStr(event.target.value);
              },
              inputRef: startDateControl,
            })}
          />
        </div>
        <div
          data-target={String(target === CONTROL.END_DATE)}
          className={classes.dateDialogFieldWrapper}
        >
          <TextField
            {...makeDateFieldProps(CONTROL.END_DATE, {
              value: endDateStr,
              label: secondDateLabel,
              onChange: (event) => {
                setEndDateStr(event.target.value);
              },
              inputRef: endDateControl,
            })}
          />
        </div>
      </div>
      <div className={classes.dateDialogPickerWrapper}>
        {target === CONTROL.START_DATE ? (
          <DatePicker
            {...makeDatePickerProps({
              value: startDateStr,
              maxDate: getDateLimitProp(endDateStr),
              onAccept: (date) => {
                setStartDateStr(formatDate(date));
                endDateControl.current.focus();
              },
            })}
          />
        ) : (
          <DatePicker
            {...makeDatePickerProps({
              value: endDateStr,
              minDate: getDateLimitProp(startDateStr),
              initialFocusedDate: startDateStr !== '' ? startDateStr : undefined,
              onAccept: (date) => {
                setEndDateStr(formatDate(date));
                endDateControl.current.focus();
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
          {prompt}
          {!requireBothDates ? (
            <>{`\u00A0`}You can leave either field blank to ignore those fields.</>
          ) : (
            <>{`\u00A0`}Please enter both a start and end date.</>
          )}
        </DialogContentText>
        {dialogBody}
        <DateErrors
          startDateStr={startDateStr}
          endDateStr={endDateStr}
          onValidityChange={(allValid) => setValid(allValid)}
          requireBothDates={requireBothDates}
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
