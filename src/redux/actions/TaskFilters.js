import * as TYPES from '../ActionTypes';

export const setTaskFilter = filter => ({
  type: TYPES.SET_TASK_FILTER,
  filter
});
