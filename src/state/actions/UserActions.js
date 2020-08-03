import { ACTION_TYPES } from './ActionTypes';

export const setUsers = (users) => ({
  type: ACTION_TYPES.SET_USERS,
  users,
});
