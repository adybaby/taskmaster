import {
  day,
  beforeOrE,
  afterOrE,
  getDateRangeForWeek,
  getDateRangeForMonth,
  getDateRangeForYear,
  areDateRangesOverlapping,
} from '../../../../util/Dates';

const createExecute = (dateField, defaultParams) => (tasks, params) => {
  let startDate = null;
  let endDate = null;
  if (typeof defaultParams !== 'undefined') {
    startDate = defaultParams.startDate;
    endDate = defaultParams.endDate;
  } else {
    startDate = params.startDate;
    endDate = params.endDate;
  }

  if (dateField !== null) {
    return tasks.filter((task) => {
      if (task[dateField] === null || typeof task[dateField] === 'undefined') {
        return false;
      }
      return (
        (startDate === null || afterOrE(task[dateField], startDate)) &&
        (endDate === null || beforeOrE(task[dateField], endDate))
      );
    });
  }

  return tasks.filter((task) => {
    if (task.startDate === null || typeof task.startDate === 'undefined') {
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
      id: `ANY_TIME`,
      label: 'at any time',
      range: { startDate: null, endDate: null },
      execute: createExecute(dateField, { startDate: null, endDate: null }),
    },
    {
      id: `TODAY`,
      label: 'today',
      range: { startDate: day(), endDate: day() },
      execute: createExecute(dateField, { startDate: day(), endDate: day() }),
    },
    {
      id: `THIS_WEEK`,
      label: 'this week',
      range: getDateRangeForWeek(day()),
      execute: createExecute(dateField, getDateRangeForWeek(day())),
    },
    {
      id: `THIS_MONTH`,
      label: 'this month',
      range: getDateRangeForMonth(day()),
      execute: createExecute(dateField, getDateRangeForMonth(day())),
    },
    {
      id: `THIS_YEAR`,
      label: 'this year',
      range: getDateRangeForYear(day()),
      execute: createExecute(dateField, getDateRangeForYear(day())),
    },
    {
      id: `PAST_WEEK`,
      label: 'in the past week',
      range: { startDate: day(null, -7), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -7), endDate: day() }),
    },
    {
      id: `PAST_MONTH`,
      label: 'in the past month',
      range: { startDate: day(null, -31), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -31), endDate: day() }),
    },
    {
      id: `PAST_YEAR`,
      label: 'in the past year',
      range: { startDate: day(null, -365), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -365), endDate: day() }),
    },
    {
      id: `OLDER`,
      label: 'over a year ago',
      range: { startDate: null, endDate: day(null, -365) },
      execute: createExecute(dateField, { startDate: null, endDate: day(null, -365) }),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          id: `COMING_WEEK`,
          label: 'in the coming week',
          range: { startDate: day(), endDate: day(null, 7) },
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 7) }),
        },
        {
          id: `COMING_MONTH`,
          label: 'in the coming month',
          range: { startDate: day(), endDate: day(null, 31) },
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 31) }),
        },
        {
          id: `COMING_YEAR`,
          label: 'in the coming year',
          range: { startDate: day(), endDate: day(null, 365) },
          execute: createExecute(dateField, {
            startDate: day(),
            endDate: day(null, 365),
          }),
        },
        {
          id: `NEXT_YEAR`,
          label: 'next year',
          range: getDateRangeForYear(day(null, 365)),
          execute: createExecute(dateField, getDateRangeForYear(day(null, 365))),
        },
      ]
    );
  }

  options.push({
    id: `CUSTOM_DATES`,
    label: 'Custom Range..',
    datePicker: true,
    execute: createExecute(dateField),
  });

  return options;
};
