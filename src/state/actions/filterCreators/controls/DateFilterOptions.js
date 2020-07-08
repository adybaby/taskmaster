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
      id: `any`,
      label: 'at any time',
      range: { startDate: null, endDate: null },
      execute: createExecute(dateField, { startDate: null, endDate: null }),
    },
    {
      id: `today`,
      label: 'today',
      range: { startDate: day(), endDate: day() },
      execute: createExecute(dateField, { startDate: day(), endDate: day() }),
    },
    {
      id: `this_week`,
      label: 'this week',
      range: getDateRangeForWeek(day()),
      execute: createExecute(dateField, getDateRangeForWeek(day())),
    },
    {
      id: `this_month`,
      label: 'this month',
      range: getDateRangeForMonth(day()),
      execute: createExecute(dateField, getDateRangeForMonth(day())),
    },
    {
      id: `this_year`,
      label: 'this year',
      range: getDateRangeForYear(day()),
      execute: createExecute(dateField, getDateRangeForYear(day())),
    },
    {
      id: `past_week`,
      label: 'in the past week',
      range: { startDate: day(null, -7), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -7), endDate: day() }),
    },
    {
      id: `past_month`,
      label: 'in the past month',
      range: { startDate: day(null, -31), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -31), endDate: day() }),
    },
    {
      id: `past_year`,
      label: 'in the past year',
      range: { startDate: day(null, -365), endDate: day() },
      execute: createExecute(dateField, { startDate: day(null, -365), endDate: day() }),
    },
    {
      id: `older`,
      label: 'over a year ago',
      range: { startDate: null, endDate: day(null, -365) },
      execute: createExecute(dateField, { startDate: null, endDate: day(null, -365) }),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          id: `coming_week`,
          label: 'in the coming week',
          range: { startDate: day(), endDate: day(null, 7) },
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 7) }),
        },
        {
          id: `coming_month`,
          label: 'in the coming month',
          range: { startDate: day(), endDate: day(null, 31) },
          execute: createExecute(dateField, { startDate: day(), endDate: day(null, 31) }),
        },
        {
          id: `coming_year`,
          label: 'in the coming year',
          range: { startDate: day(), endDate: day(null, 365) },
          execute: createExecute(dateField, {
            startDate: day(),
            endDate: day(null, 365),
          }),
        },
        {
          id: `next_year`,
          label: 'next year',
          range: getDateRangeForYear(day(null, 365)),
          execute: createExecute(dateField, getDateRangeForYear(day(null, 365))),
        },
      ]
    );
  }

  options.push({
    id: `custom_dates`,
    label: 'Custom Range..',
    datePicker: true,
    execute: createExecute(dateField),
  });

  return options;
};
