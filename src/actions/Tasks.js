import * as TYPES from '../constants/ActionTypes';
import { findTasks as findTasksFromDb } from '../data/DataInterface';
import * as STATUS from '../constants/FindStatus';

export const addTask = task => ({
  type: TYPES.ADD_TASK,
  task
});

export const setTasks = tasks => ({
  type: TYPES.SET_TASKS,
  tasks
});

export const removeTask = task => ({
  type: TYPES.REMOVE_TASK,
  task
});

export const clearTasks = () => ({
  type: TYPES.CLEAR_TASKS
});

export const setTaskStatus = taskStatus => ({
  type: TYPES.SET_TASK_STATUS,
  taskStatus
});

export const setTab = tab => ({
  type: TYPES.SET_TAB,
  tab
});

export const findTasks = searchTerm => dispatch => {
  dispatch(setTaskStatus(STATUS.SEARCHING));
  findTasksFromDb(searchTerm)
    .then(taskResults => {
      if (taskResults.length > 0) {
        dispatch(setTasks(taskResults));
        dispatch(setTaskStatus(STATUS.HAVE_RESULTS));
      } else {
        dispatch(clearTasks());
        dispatch(setTaskStatus(STATUS.NO_RESULTS));
      }
    })
    .catch(setTaskStatus(STATUS.ERROR));
};

export const setFilterBarVisible = visible => ({
  type: TYPES.SET_FILTER_BAR_VISIBLE,
  visible
});

export const setTaskFilter = filter => ({
  type: TYPES.SET_TASK_FILTER,
  filter
});

export const clearTaskFilters = filter => ({
  type: TYPES.CLEAR_TASK_FILTERS,
  filter
});

export const setSortOrder = sortOrder => ({
  type: TYPES.SET_SORT_ORDER,
  sortOrder
});

export const setSearchTerm = searchTerm => ({
  type: TYPES.SET_SEARCH_TERM,
  searchTerm
});
