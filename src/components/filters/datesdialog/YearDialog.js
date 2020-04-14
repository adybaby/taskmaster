/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { isValid } from 'date-fns';
import { styles } from '../../../styles/Styles';
import { dialogBase } from './DialogBase';

const useStyles = makeStyles(styles);

export const YearDialog = ({ open, handleClose, ...other }) => {
  const classes = useStyles();
  const [years, setYears] = useState({ from: '', to: '' });

  const bothDatesBlank = years.from === '' && years.to === '';
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

  const dialogBody = (
    <div style={{ flexGrow: 1 }}>
      <TextField {...fromProps} />
      <TextField {...toProps} />
    </div>
  );

  return (
    <div>
      {dialogBase(
        'year',
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
