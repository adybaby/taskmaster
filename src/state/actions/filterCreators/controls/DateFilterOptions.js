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
  let from = null;
  let to = null;
  if (typeof defaultParams !== 'undefined') {
    from = defaultParams.from;
    to = defaultParams.to;
  } else {
    from = params.from;
    to = params.to;
  }
  return dateField !== null
    ? tasks.filter((task) =>
        task[dateField] === null || typeof task[dateField] === 'undefined'
          ? null
          : (from === null || afterOrE(task[dateField], from)) &&
            (to === null || beforeOrE(task[dateField], to))
      )
    : tasks.filter((task) =>
        task.startDate === null || typeof task.startDate === 'undefined'
          ? null
          : (from !== null &&
              to !== null &&
              areDateRangesOverlapping({ from, to }, { from: task.startDate, to: task.endDate })) ||
            (to === null && afterOrE(task.endDate, from)) ||
            (from === null && beforeOrE(task.startDate, to))
      );
};

export const createDateFilterOptions = (dateField, includeFuture) => {
  const options = [
    {
      id: `ANY_TIME`,
      label: 'at any time',
      range: { from: null, to: null },
      execute: createExecute(dateField, { from: null, to: null }),
    },
    {
      id: `TODAY`,
      label: 'today',
      range: { from: day(), to: day() },
      execute: createExecute(dateField, { from: day(), to: day() }),
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
      range: { from: day(null, -7), to: day() },
      execute: createExecute(dateField, { from: day(null, -7), to: day() }),
    },
    {
      id: `PAST_MONTH`,
      label: 'in the past month',
      range: { from: day(null, -31), to: day() },
      execute: createExecute(dateField, { from: day(null, -31), to: day() }),
    },
    {
      id: `PAST_YEAR`,
      label: 'in the past year',
      range: { from: day(null, -365), to: day() },
      execute: createExecute(dateField, { from: day(null, -365), to: day() }),
    },
    {
      id: `OLDER`,
      label: 'over a year ago',
      range: { from: null, to: day(null, -365) },
      execute: createExecute(dateField, { from: null, to: day(null, -365) }),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          id: `COMING_WEEK`,
          label: 'in the coming week',
          range: { from: day(), to: day(null, 7) },
          execute: createExecute(dateField, { from: day(), to: day(null, 7) }),
        },
        {
          id: `COMING_MONTH`,
          label: 'in the coming month',
          range: { from: day(), to: day(null, 31) },
          execute: createExecute(dateField, { from: day(), to: day(null, 31) }),
        },
        {
          id: `COMING_YEAR`,
          label: 'in the coming year',
          range: { from: day(), to: day(null, 365) },
          execute: createExecute(dateField, {
            from: day(),
            to: day(null, 365),
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
