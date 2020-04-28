const DEFAULT_FILTER_ID = 'ANY_AUTHOR';

const createExecute = (userId) => (tasks) => tasks.filter((task) => task.createdBy === userId);

export const createCreatedBySelectFilterControl = (users, currentUser) => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'any author',
      default: true,
    },
    {
      id: 'ME',
      label: 'me',
      execute: createExecute(currentUser.id),
    },
    ...users
      .map((user) => ({
        id: `${user.id}`,
        label: `${user.firstName} ${user.lastName}`,
        execute: createExecute(user.id),
      }))
      .sort(),
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
