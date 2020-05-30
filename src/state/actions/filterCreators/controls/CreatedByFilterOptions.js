import { formatUserName } from '../../../../util/Users';

const createExecute = (userId) => (tasks) => tasks.filter((task) => task.createdBy === userId);

export const createCreatedByFilterOptions = (users, currentUser) => [
  {
    id: 'any',
    label: 'any author',
  },
  {
    id: 'me',
    label: 'Me',
    execute: createExecute(currentUser.id),
  },
  ...users
    .map((user) => ({
      id: `${user.id}`,
      label: formatUserName(user),
      execute: createExecute(user.id),
    }))
    .sort(),
];
