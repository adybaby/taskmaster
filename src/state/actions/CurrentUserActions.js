import { ACTION_TYPES } from './ActionTypes';

export const setCurrentUser = (user) => ({
  type: ACTION_TYPES.SET_CURRENT_USER,
  user,
});

export const updateCurrentUser = (user) => ({
  type: ACTION_TYPES.UPDATE_CURRENT_USER,
  user,
});
