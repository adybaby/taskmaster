import * as TYPES from '../ActionTypes';

export const setTaskListFilterControl = (filterControl) => ({
  type: TYPES.SET_TASK_LIST_FILTER_CONTROL,
  filterControl,
});

export const setTaskListFilterControls = (filterControls) => ({
  type: TYPES.SET_TASK_LIST_FILTER_CONTROLS,
  filterControls,
});

export const resetTaskListFilterControl = (id) => ({
  type: TYPES.RESET_TASK_LIST_FILTER_CONTROL,
  id,
});

export const resetAllTaskListFilterControls = () => ({
  type: TYPES.RESET_ALL_TASK_LIST_FILTER_CONTROLS,
});
