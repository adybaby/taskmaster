const DEFAULT_FILTER_ID = 'ANY_AUTHOR';

const createFilterFunction = (userId) => (tasks) =>
  tasks.filter((task) => task.createdBy === userId);

export const createCreatedByFilters = (users) => ({
  filters: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'Any Author',
      default: true,
    },
    ...users
      .map((user) => ({
        id: `${user.id}`,
        label: `${user.name}`,
        execute: createFilterFunction(user.id),
      }))
      .sort(),
  ],
  defaultFilterId: DEFAULT_FILTER_ID,
  selectedFilterId: DEFAULT_FILTER_ID,
});
