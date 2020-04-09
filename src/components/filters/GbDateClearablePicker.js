/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import format from 'date-fns/format';
import { isSameDay, isBefore, isAfter, isValid } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { createStyles } from '@material-ui/core/styles';
import { IconButton, withStyles } from '@material-ui/core';

const styles = createStyles((theme) => ({
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '50%',
  },
}));

const GbClearableDatePicker = (props) => {
  const { minDate, maxDate, classes } = props;
  const { value, ...other } = props;

  const [intVal, setIntVal] = useState(value);

  const isSynced = intVal === value;

  useEffect(() => {
    if (!isSynced) {
      if (
        typeof value !== 'undefined' &&
        value !== null &&
        value !== '' &&
        isValid(new Date(value))
      ) {
        const delim = value.includes('/')
          ? /\//g
          : value.includes('-')
          ? '-'
          : value.includes(' ')
          ? ' '
          : null;
        if (delim !== null) {
          const parts = value.split(delim);
          if (parts.length === 3 && !isNaN(parts[1])) {
            setIntVal(new Date(parts[2], parts[1] - 1, parts[0]));
          } else {
            setIntVal(new Date(value));
          }
        } else {
          setIntVal(new Date(value));
        }
      }
    }
  }, [value, isSynced]);

  const renderDay = (date, selectedDate, dayInCurrentMonth) => {
    const isSame = isSameDay(date, selectedDate);
    const beforeMin = isBefore(date, new Date(minDate));
    const afterMax = isAfter(date, new Date(maxDate));
    const emptyValue = value === null || value === '';

    const wrapperClassName = clsx({
      [classes.highlight]: isSame && !emptyValue,
    });

    const dayClassName = clsx(classes.day, {
      [classes.disabled]: !dayInCurrentMonth || beforeMin || afterMax,
    });
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, 'd')} </span>
        </IconButton>
      </div>
    );
  };

  return <MuiDatePicker value={intVal} renderDay={renderDay} {...other} />;
};

export default withStyles(styles)(GbClearableDatePicker);