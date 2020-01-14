/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import * as TASK_FILTERS from '../constants/TaskFilters';

const getTaskFilter = state => state.taskFilter;
const getTasks = state => state.tasks;

const getVisibleTasks = createSelector([getTaskFilter, getTasks], (taskFilters, tasks) => {
  if (taskFilters !== null) {
    let filteredTasks = tasks;
    taskFilters.forEach(filter => {
      switch (filter.type) {
        case TASK_FILTERS.TYPE:
          filteredTasks = filteredTasks.filter(task => task.type === filter.value);
          break;
        case TASK_FILTERS.SEARCH_TERM:
          filteredTasks = filteredTasks.filter(task => task.title.includes(filter.value));
          break;
        default:
          filteredTasks = tasks;
      }
    });
    return filteredTasks;
  }
  return tasks;
});

export default getVisibleTasks;
