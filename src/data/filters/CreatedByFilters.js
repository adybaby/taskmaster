const DEFAULT_FILTER_ID = 'ANY_AUTHOR';

const createFilterFunction = (userId) => (tasks) =>
  tasks.filter((task) => task.createdBy === userId);

export const createCreatedByFilters = (users) => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'any author',
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
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
