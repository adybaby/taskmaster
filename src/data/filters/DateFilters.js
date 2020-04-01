const DEFAULT_FILTER_ID = `ANY_TIME`;

const now = (days, date) => {
  if (days === undefined) return new Date().getTime();
  const d = typeof date === 'undefined' ? new Date() : new Date(date);
  d.setDate(d.getDate() + days);
  return d.getTime();
};

const createExecuteFunction = (dateField, cannedDates) => {
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

export const createDateFilters = (dateField, includeFuture) => {
  const filters = [
    { id: DEFAULT_FILTER_ID, label: 'Any Time', default: true },
    {
      id: `TODAY`,
      label: 'Today',
      execute: createExecuteFunction(dateField, { from: now(), to: now() }),
    },
    {
      id: `PAST_WEEK`,
      label: 'Past Week',
      execute: createExecuteFunction(dateField, { from: now(-7), to: now() }),
    },
    {
      id: `PAST_MONTH`,
      label: 'Past Month',
      execute: createExecuteFunction(dateField, {
        from: now(-31),
        to: now(),
      }),
    },
    {
      id: `PAST_YEAR`,
      label: 'Past Year',
      execute: createExecuteFunction(dateField, {
        from: now(-365),
        to: now(),
      }),
    },
    {
      id: `OLDER`,
      label: 'Older than a year',
      execute: createExecuteFunction(dateField, { from: null, to: now(-365) }),
    },
  ];

  if (includeFuture) {
    filters.push(
      ...[
        {
          id: `COMING_WEEK`,
          label: 'Coming Week',
          execute: createExecuteFunction(dateField, {
            from: now(),
            to: now(7),
          }),
        },
        {
          id: `COMING_MONTH`,
          label: 'Coming Month',
          execute: createExecuteFunction(dateField, {
            from: now(),
            to: now(31),
          }),
        },
        {
          id: `COMING_YEAR`,
          label: 'Coming Year',
          execute: createExecuteFunction(dateField, {
            from: now(),
            to: now(365),
          }),
        },
      ]
    );
  }

  filters.push({
    id: `CUSTOM_DATES`,
    label: 'Custom Dates..',
    datePicker: true,
    dontPreCount: true,
    execute: createExecuteFunction(dateField),
  });

  return { filters, defaultFilterId: DEFAULT_FILTER_ID, selectedFilterId: DEFAULT_FILTER_ID };
};
