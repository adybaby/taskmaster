import { now } from '../../../util/Dates';

const DEFAULT_FILTER_ID = `ANY_TIME`;

const createExecute = (dateField, cannedDates) => {
  const filterByDate = (tasks, fromDate, toDate) => {
    const dateOnly = (date) => {
      if (typeof date === 'undefined' || date === null) return null;
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    };
    const from = dateOnly(fromDate);
    const to = dateOnly(toDate);

    return tasks.filter((task) => {
      if (task[dateField] === null) return false;
      const date = dateOnly(task[dateField]);
      return (from === null || date >= from) && (to === null || date <= to);
    });
  };

  const filterBySpecifiedDate = (tasks, params) => {
    return filterByDate(tasks, params.from, params.to);
  };

  const filterByCannedDate = (tasks) => {
    return filterByDate(tasks, cannedDates.from, cannedDates.to);
  };

  return typeof cannedDates === 'undefined' ? filterBySpecifiedDate : filterByCannedDate;
};

export const createDateSelectFilterControl = (dateField, includeFuture) => {
  const options = [
    { id: DEFAULT_FILTER_ID, label: 'at any time', default: true },
    {
      id: `TODAY`,
      label: 'today',
      execute: createExecute(dateField, { from: now(), to: now() }),
    },
    {
      id: `PAST_WEEK`,
      label: 'in the past week',
      execute: createExecute(dateField, { from: now(-7), to: now() }),
    },
    {
      id: `PAST_MONTH`,
      label: 'in the past month',
      execute: createExecute(dateField, {
        from: now(-31),
        to: now(),
      }),
    },
    {
      id: `PAST_YEAR`,
      label: 'in the past year',
      execute: createExecute(dateField, {
        from: now(-365),
        to: now(),
      }),
    },
    {
      id: `OLDER`,
      label: 'over a year ago',
      execute: createExecute(dateField, { from: null, to: now(-365) }),
    },
  ];

  if (includeFuture) {
    options.push(
      ...[
        {
          id: `COMING_WEEK`,
          label: 'in the coming week',
          execute: createExecute(dateField, {
            from: now(),
            to: now(7),
          }),
        },
        {
          id: `COMING_MONTH`,
          label: 'in the coming month',
          execute: createExecute(dateField, {
            from: now(),
            to: now(31),
          }),
        },
        {
          id: `COMING_YEAR`,
          label: 'in the coming year',
          execute: createExecute(dateField, {
            from: now(),
            to: now(365),
          }),
        },
      ]
    );
  }

  options.push({
    id: `CUSTOM_DATES`,
    label: 'Custom Range..',
    datePicker: true,
    dontPreCount: true,
    execute: createExecute(dateField),
  });

  return { options, defaultId: DEFAULT_FILTER_ID, selectedId: DEFAULT_FILTER_ID };
};
