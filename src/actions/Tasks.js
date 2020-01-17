import * as TYPES from '../constants/ActionTypes';
import { loadTasks as loadTaskData } from '../data/DataInterface';

export const setTasksLoaded = tasksLoaded => ({
  type: TYPES.SET_TASKS_LOADED,
  tasksLoaded
});

export const addTasks = tasks => ({
  type: TYPES.ADD_TASKS,
  tasks
});

export const addTask = task => ({
  type: TYPES.ADD_TASK,
  task
});

export const removeTask = task => ({
  type: TYPES.REMOVE_TASK,
  task
});

export const setSortOrder = sortOrder => ({
  type: TYPES.SET_SORT_ORDER,
  sortOrder
});

export const loadTasks = () => dispatch => {
  loadTaskData(tasks => {
    dispatch(addTasks(tasks));
    dispatch(setTasksLoaded(true));
  });
};

export const setTaskFilter = filter => ({
  type: TYPES.SET_TASK_FILTER,
  filter
});

export const clearTaskFilters = filter => ({
  type: TYPES.CLEAR_TASK_FILTERS,
  filter
});
