import * as TYPES from '../constants/ActionTypes';

export const findTasks = () => ({
  type: TYPES.FIND_TASKS
});

export const addTask = task => ({
  type: TYPES.ADD_TASK,
  task
});

export const removeTask = task => ({
  type: TYPES.REMOVE_TASK,
  task
});

export const addTaskFilter = filter => ({
  type: TYPES.ADD_TASK_FILTER,
  filter
});

export const removeTaskFilter = filter => ({
  type: TYPES.REMOVE_TASK_FILTER,
  filter
});

export const clearFilters = () => ({ type: TYPES.CLEAR_FILTERS });

export const setTasksLoaded = tasksLoaded => ({
  type: TYPES.SET_TASKS_LOADED,
  tasksLoaded
});
