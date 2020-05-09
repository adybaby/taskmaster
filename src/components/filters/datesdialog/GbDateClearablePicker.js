import React, { useEffect, useState } from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { IconButton } from '@material-ui/core';
import format from 'date-fns/format';
import { useStyles } from '../../../styles/Styles';
import { equals, before, after, ukToUs, isValidDateString } from '../../../util/Dates';

const GbClearableDatePicker = (props) => {
  const classes = useStyles();
  const { minDate, maxDate, value, ...other } = props;

  const [intVal, setIntVal] = useState(value);

  const isSynced = intVal === value;

  useEffect(() => {
    if (!isSynced) {
      if (
        typeof value !== 'undefined' &&
        value !== null &&
        value !== '' &&
        isValidDateString(ukToUs(value))
      ) {
        setIntVal(new Date(ukToUs(value)));
      }
    }
  }, [value, isSynced]);

  const renderDay = (date, selectedDate, dayInCurrentMonth) => {
    const dayIsSelected = equals(date, selectedDate);
    const emptyValue = value === null || value === '';
    const dayDisabled = !dayInCurrentMonth || before(date, minDate) || after(date, maxDate);

    return (
      <div
        data-highlight={String(dayIsSelected && !emptyValue)}
        className={classes.datePickerDayWrapper}
      >
        <IconButton disabled={dayDisabled} className={classes.datePickerDay}>
          <span> {format(date, 'd')} </span>
        </IconButton>
      </div>
    );
  };

  return (
    <MuiDatePicker
      value={intVal}
      renderDay={renderDay}
      minDate={minDate}
      maxDate={maxDate}
      {...other}
    />
  );
};

export default GbClearableDatePicker;
