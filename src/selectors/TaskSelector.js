/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import * as TASK_FILTERS from '../constants/TaskFilters';
import * as SORT_ORDER from '../constants/SortOrders';

const getTaskFilters = state => state.taskFilters;
const getTasks = state => state.tasks;
const getSortOrder = state => state.sortOrder;

const filterByDate = (filteredTasks, option) => {
  switch (option) {
    case TASK_FILTERS.CREATED_OPTIONS.TODAY:
      return filteredTasks.filter(task => new Date(task.createdDate) === new Date());

    case TASK_FILTERS.CREATED_OPTIONS.THIS_WEEK:
      return filteredTasks.filter(task => {
        const d = new Date();
        return new Date(task.createdDate) >= d.setDate(d.getDate() - 7);
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

const filterTasks = createSelector([getTaskFilters, getTasks], (taskFilters, tasks) => {
  let filteredTasks = tasks;

  if (taskFilters.type !== TASK_FILTERS.DEFAULTS.TYPE) {
    filteredTasks = filteredTasks.filter(task => task.type === taskFilters.type);
  }

  if (taskFilters.vacancies !== TASK_FILTERS.DEFAULTS.VACANCIES) {
    filteredTasks = filteredTasks.filter(
      task =>
        task.vacancies != null &&
        task.vacancies.length > 0 &&
        task.vacancies.includes(taskFilters.vacancies)
    );
  }

  if (taskFilters.createdBy !== TASK_FILTERS.DEFAULTS.CREATED_BY) {
    filteredTasks = filteredTasks.filter(task => task.createdBy === taskFilters.createdBy);
  }

  if (taskFilters.createdOn !== TASK_FILTERS.DEFAULTS.CREATED_ON) {
    filteredTasks = filterByDate(filteredTasks, taskFilters.createdOn);
  }

  return filteredTasks;
});

const getVisibleTasks = createSelector([getSortOrder, filterTasks], (sortOrder, tasks) => {
  switch (sortOrder) {
    case SORT_ORDER.OPTIONS.LATEST: {
      return tasks.concat().sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    }

    case SORT_ORDER.OPTIONS.PRIORITY: {
      return tasks
        .concat()
        .sort(
          (a, b) => (a.priority === null ? 0 : a.priority) > (b.priority === null ? 0 : b.priority)
        );
    }

    case SORT_ORDER.OPTIONS.START_DATE: {
      return tasks.concat().sort((a, b) => {
        if (typeof a.startDate === 'undefined') {
          if (typeof b.startDate === 'undefined') {
            return 0;
          }
          return 1;
        }
        if (typeof b.startDate === 'undefined') {
          return -1;
        }
        return new Date(a.startDate) - new Date(b.startDate);
      });
    }

    case SORT_ORDER.OPTIONS.AUTHOR: {
      return tasks.concat().sort((a, b) => a.createdBy.localeCompare(b.createdBy));
    }

    default:
      return tasks;
  }
});

export default getVisibleTasks;
