import { ACTION_TYPES } from './ActionTypes';

export const setDbStatus = (status) => ({
  type: ACTION_TYPES.SET_DB_STATUS,
  status,
});
