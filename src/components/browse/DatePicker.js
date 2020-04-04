import clsx from 'clsx';
import format from 'date-fns/format';
import { isSameDay, isBefore, isAfter } from 'date-fns';
import React from 'react';
import { DatePicker as MuiDatePicker } from '@material-ui/pickers';
import { createStyles } from '@material-ui/core/styles';
import { IconButton, withStyles } from '@material-ui/core';

const styles = createStyles((theme) => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '50%',
  },
}));

const DatePicker = (props) => {
  const { minDate, maxDate, value, classes } = props;

  const renderDay = (date, selectedDate, dayInCurrentMonth) => {
    const isSame = isSameDay(date, selectedDate);
    const beforeMin = isBefore(date, new Date(minDate));
    const afterMax = isAfter(date, new Date(maxDate));
    const emptyValue = value === null || value === '';

    const wrapperClassName = clsx({
      [classes.highlight]: isSame && !emptyValue,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth || beforeMin || afterMax,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth,
    });
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, 'd')} </span>
        </IconButton>
      </div>
    );
  };

  return <MuiDatePicker renderDay={renderDay} {...props} />;
};

export default withStyles(styles)(DatePicker);
