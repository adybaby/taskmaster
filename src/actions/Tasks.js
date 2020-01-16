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

export const loadTasks = () => dispatch => {
  loadTaskData(tasks => {
    dispatch(addTasks(tasks));
    dispatch(setTasksLoaded(true));
  });
};

export const addTaskFilter = filter => ({
  type: TYPES.ADD_TASK_FILTER,
  filter
});

export const removeTaskFilter = filter => ({
  type: TYPES.REMOVE_TASK_FILTER,
  filter
});

export const clearFilters = () => ({ type: TYPES.CLEAR_FILTERS });
