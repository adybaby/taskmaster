/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { isValid } from 'date-fns';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const YearDialog = ({ open, handleClose, ...other }) => {
  const classes = useStyles();
  const [years, setYears] = useState({ from: '', to: '' });

  const bothYearsBlank = years.from === '' && years.to === '';
  const fromNotValid = isNaN(years.from);
  const toNotValid = isNaN(years.to);
  const datesOutOfOrder =
    years.from !== '' && years.to !== '' && parseInt(years.from, 10) > parseInt(years.to, 10);

  const handleOk = () => {
    const fromDate = new Date(parseInt(years.from, 10), 0, 1);
    const toDate = new Date(parseInt(years.to, 10) + 1, 0, 1);
    handleClose(isValid(fromDate) ? fromDate : null, isValid(toDate) ? toDate : null);
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
      setYears({ ...years, from: event.target.value });
    },
    autoFocus: true,
    value: years.from,
    label: `Starting in..`,
    ...inputProps,
  };

  const toProps = {
    onChange: (event) => {
      setYears({ ...years, to: event.target.value });
    },
    value: years.to,
    label: `Ending in..`,
    ...inputProps,
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="year picker"
        onClose={() => handleClose(null, null)}
        {...other}
      >
        <DialogTitle id="year picker-title">Select a range</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the years to filter by. You can leave either field blank to ignore those fields.
          </DialogContentText>
          <div style={{ flexGrow: 1 }}>
            <TextField {...fromProps} />
            <TextField {...toProps} />
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
            disabled={fromNotValid || toNotValid || datesOutOfOrder || bothYearsBlank}
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
