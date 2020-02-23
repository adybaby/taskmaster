import * as TYPES from '../constants/ActionTypes';

export const setTaskFilter = filter => ({
  type: TYPES.SET_TASK_FILTER,
  filter
});
