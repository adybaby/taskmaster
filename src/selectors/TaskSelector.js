/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import * as TASK_FILTERS from '../constants/TaskFilters';
import { filterBy } from '../util/StringUtils';

const getTaskFilter = state => state.taskFilter;
const getTasks = state => state.tasks;

const filterByDate = (filteredTasks, option) => {
  switch (option) {
    case TASK_FILTERS.CREATED_OPTIONS.TODAY:
      return filteredTasks.filter(task => new Date(task.createdDate) === new Date());
    case TASK_FILTERS.CREATED_OPTIONS.THIS_WEEK:
      return filteredTasks.filter(task => {
        const d = new Date();
        return new Date(task.createdDate) >= d.setDate(d.getDate() - 5);
      });
    case TASK_FILTERS.CREATED_OPTIONS.THIS_MONTH:
      return filteredTasks.filter(task => {
        const d = new Date();
        return new Date(task.createdDate) >= d.setDate(d.getDate() - 31);
      });
    case TASK_FILTERS.CREATED_OPTIONS.THIS_YEAR:
      return filteredTasks.filter(task => {
        const d = new Date();
        return new Date(task.createdDate) >= d.setDate(d.getDate() - 365);
      });
    case TASK_FILTERS.CREATED_OPTIONS.OLDER:
      return filteredTasks.filter(task => {
        const d = new Date();
        return new Date(task.createdDate) < d.setDate(d.getDate() - 365);
      });
    default:
      return filteredTasks;
  }
};

const getVisibleTasks = createSelector([getTaskFilter, getTasks], (taskFilters, tasks) => {
  if (taskFilters !== null) {
    let filteredTasks = tasks;
    taskFilters.forEach(filter => {
      switch (filter.type) {
        case TASK_FILTERS.TYPE:
          filteredTasks = filteredTasks.filter(task => task.type === filter.value);
          break;
        case TASK_FILTERS.SEARCH_TERM:
          filteredTasks = filteredTasks.filter(filterBy(filter.value));
          break;
        case TASK_FILTERS.VACANCIES:
          filteredTasks = filteredTasks.filter(
            task =>
              task.vacancies != null &&
              task.vacancies.length > 0 &&
              task.vacancies.includes(filter.value)
          );
          break;
        case TASK_FILTERS.CREATED:
          break;
        case TASK_FILTERS.AUTHOR:
          filteredTasks = filterByDate(filteredTasks, filter.value);
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
