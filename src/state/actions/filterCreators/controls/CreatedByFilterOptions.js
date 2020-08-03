import { formatUserName } from '../../../../util/Users';

import { store } from '../../../Store';

const createExecute = (userId) => (tasks) => {
  const id = userId == null ? store.getState().currentUser.id : userId;
  return tasks.filter((task) => task.createdBy === id);
};

export const createCreatedByFilterOptions = (users) => [
  {
    id: 'any',
    label: 'any author',
  },
  {
    id: 'me',
    label: 'Me',
    execute: createExecute(),
  },
  ...users
    .map((user) => ({
      id: `${user.id}`,
      label: formatUserName(user),
      execute: createExecute(user.id),
    }))
    .sort(),
];
