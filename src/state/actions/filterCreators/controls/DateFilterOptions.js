import {
  day,
  beforeOrE,
  afterOrE,
  getDateRangeForWeek,
  getDateRangeForMonth,
  getDateRangeForYear,
  areDateRangesOverlapping,
} from '../../../../util/Dates';
import { DATE_RANGE } from '../../../../constants/Constants';

const createExecute = (dateField, defaultParams) => (tasks, params) => {
  let startDate = null;
  let endDate = null;
  if (defaultParams != null) {
    startDate = defaultParams.startDate;
    endDate = defaultParams.endDate;
  } else {
    startDate = params[0];
    endDate = params[1];
  }

  if (dateField !== null) {
    return tasks.filter((task) => {
      if (task[dateField] == null) {
        return false;
      }
      return (
        (startDate === null || afterOrE(task[dateField], startDate)) &&
        (endDate === null || beforeOrE(task[dateField], endDate))
      );
    });
  }

  return tasks.filter((task) => {
    if (task.startDate == null) {
      return false;
    }

    if (startDate !== null && endDate !== null) {
      return areDateRangesOverlapping(
        { startDate, endDate },
        { startDate: task.startDate, endDate: task.endDate }
      );
    }

    return (
      (startDate === null || afterOrE(task.startDate, startDate)) &&
      (endDate === null || beforeOrE(task.endDate, endDate))
    );
  });
};

export const createDateFilterOptions = (dateField, includeFuture) => {
  const options = [
    {
      ...DATE_RANGE.ANY,
      execute: createExecute(dateField, { startDate: null, endDate: null }),
    },
    {
      ...DATE_RANGE.TODAY,
      execute: createExecute(dateField, { startDate: day(), endDate: day() }),
    },
    {
      ...DATE_RANGE.THIS_WEEK,
      execute: createExecute(dateField, getDateRangeForWeek(day())),
    },
    {
      ...DATE_RANGE.THIS_MONTH,
      execute: createExecute(dateField, getDateRangeForMonth(day())),
    },
    {
      ...DATE_RANGE.THIS_YEAR,
      execute: createExecute(dateField, getDateRangeForYear(day())),
    },
    {
      ...DATE_RANGE.PAST_WEEK,
      execute: createExecute(dateField, { startDate: day(null, -7), endDate: day() }),
    },
    {
      ...DATE_RANGE.PAST_MONTH,
      execute: createExecute(dateField, { startDate: day(null, -31), endDate: day() }),
    },
    {
      ...DATE_RANGE.PAST_YEAR,
      execute: createExecute(dateField, { startDate: day(null, -365), endDate: day() }),
    },
    {
      ...DATE_RANGE.OLDER,
      execute: createExecute(dateField, { startDate: null, endDate: day(null, -365) }),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          ...DATE_RANGE.COMING_WEEK,
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 7) }),
        },
        {
          ...DATE_RANGE.COMING_MONTH,
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 31) }),
        },
        {
          ...DATE_RANGE.COMING_YEAR,
          execute: createExecute(dateField, {
            startDate: day(),
            endDate: day(null, 365),
          }),
        },
        {
          ...DATE_RANGE.NEXT_YEAR,
          execute: createExecute(dateField, getDateRangeForYear(day(null, 365))),
        },
      ]
    );
  }

  options.push({
    ...DATE_RANGE.CUSTOM_DATES,
    datePicker: true,
    execute: createExecute(dateField),
  });

  return options;
};
