import { ACTION_TYPES } from '../../constants/Constants';

export const setTaskListFilterControl = (filterControl) => ({
  type: ACTION_TYPES.SET_TASK_LIST_FILTER_CONTROL,
  filterControl,
});

export const setTaskListFilterControls = (filterControls) => ({
  type: ACTION_TYPES.SET_TASK_LIST_FILTER_CONTROLS,
  filterControls,
});

export const resetTaskListFilterControl = (id) => ({
  type: ACTION_TYPES.RESET_TASK_LIST_FILTER_CONTROL,
  id,
});

export const resetAllTaskListFilterControls = () => ({
  type: ACTION_TYPES.RESET_ALL_TASK_LIST_FILTER_CONTROLS,
});
