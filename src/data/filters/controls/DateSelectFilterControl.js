import {
  day,
  beforeOrE,
  afterOrE,
  getDateRangeForWeek,
  getDateRangeForMonth,
  getDateRangeForYear,
} from '../../../util/Dates';

const DEFAULT_FILTER_ID = `ANY_TIME`;

const createExecute = (dateField) => (tasks, { from, to }) =>
  tasks.filter((task) =>
    task[dateField] === null || typeof task[dateField] === 'undefined'
      ? null
      : (from === null || afterOrE(task[dateField], from)) &&
        (to === null || beforeOrE(task[dateField], to))
  );

export const createDateSelectFilterControl = (dateField, includeFuture) => {
  const options = [
    { id: DEFAULT_FILTER_ID, label: 'at any time', default: true },
    {
      id: `TODAY`,
      label: 'today',
      params: { from: day(), to: day() },
      execute: createExecute(dateField),
    },
    {
      id: `THIS_WEEK`,
      label: 'this week',
      params: getDateRangeForWeek(day()),
      execute: createExecute(dateField),
    },
    {
      id: `THIS_MONTH`,
      label: 'this month',
      params: getDateRangeForMonth(day()),
      execute: createExecute(dateField),
    },
    {
      id: `THIS_YEAR`,
      label: 'this year',
      params: getDateRangeForYear(day()),
      execute: createExecute(dateField),
    },
    {
      id: `PAST_WEEK`,
      label: 'in the past week',
      params: { from: day(null, -7), to: day() },
      execute: createExecute(dateField),
    },
    {
      id: `PAST_MONTH`,
      label: 'in the past month',
      params: { from: day(null, -31), to: day() },
      execute: createExecute(dateField),
    },
    {
      id: `PAST_YEAR`,
      label: 'in the past year',
      params: { from: day(null, -365), to: day() },
      execute: createExecute(dateField),
    },
    {
      id: `OLDER`,
      label: 'over a year ago',
      params: { from: null, to: day(null, -365) },
      execute: createExecute(dateField),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          id: `COMING_WEEK`,
          label: 'in the coming week',
          params: { from: day(), to: day(null, 7) },
          execute: createExecute(dateField),
        },
        {
          id: `COMING_MONTH`,
          label: 'in the coming month',
          params: { from: day(), to: day(null, 31) },
          execute: createExecute(dateField),
        },
        {
          id: `COMING_YEAR`,
          label: 'in the coming year',
          params: { from: day(), to: day(null, 365) },
          execute: createExecute(dateField),
        },
        {
          id: `NEXT_YEAR`,
          label: 'next year',
          params: getDateRangeForYear(day(null, 365)),
          execute: createExecute(dateField),
        },
      ]
    );
  }

  options.push({
    id: `CUSTOM_DATES`,
    label: 'Custom Range..',
    params: { from: null, to: null },
    datePicker: true,
    dontPreCount: true,
    execute: createExecute(dateField),
  });

  return { options, defaultId: DEFAULT_FILTER_ID, selectedId: DEFAULT_FILTER_ID };
};
