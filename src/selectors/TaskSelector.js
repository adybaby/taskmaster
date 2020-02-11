/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import * as TASK_FILTERS from '../constants/TaskFilters';
import * as SORT_ORDER from '../constants/SortOrders';
import { sortOrderForType } from '../constants/Contributions';
import { sortOrderForCost } from '../constants/Costs';
import * as TYPES from '../constants/TaskTypes';

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

  if (taskFilters.type.enabled && taskFilters.type.value !== TASK_FILTERS.DEFAULTS.TYPE.value) {
    filteredTasks = filteredTasks.filter(task => task.type === taskFilters.type.value);
  }

  if (
    taskFilters.vacancies.enabled &&
    taskFilters.vacancies.value !== TASK_FILTERS.DEFAULTS.VACANCIES.value
  ) {
    filteredTasks = filteredTasks.filter(task => {
      if (task.vacancies === null) {
        return false;
      }
      for (let i = 0; i < task.vacancies.length; i++) {
        if (task.vacancies[i].title.includes(taskFilters.vacancies.value)) {
          return true;
        }
      }
      return false;
    });
  }

  if (
    taskFilters.createdBy.enabled &&
    taskFilters.createdBy.value !== TASK_FILTERS.DEFAULTS.CREATED_BY.value
  ) {
    filteredTasks = filteredTasks.filter(task => task.createdBy === taskFilters.createdBy.value);
  }

  if (
    taskFilters.createdOn.enabled &&
    taskFilters.createdOn.value !== TASK_FILTERS.DEFAULTS.CREATED_ON.value
  ) {
    filteredTasks = filterByDate(filteredTasks, taskFilters.createdOn.value);
  }

  return filteredTasks;
});

const sortTasks = (tasks, sortOrder) => {
  switch (sortOrder) {
    case SORT_ORDER.OPTIONS.LATEST: {
      return tasks.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    }

    case SORT_ORDER.OPTIONS.PRIORITY: {
      return tasks.sort((a, b) => {
        if (a.type !== b.type) {
          return sortOrderForType(a.type) - sortOrderForType(b.type);
        }
        if (
          a.priority === b.priority &&
          a.type === TYPES.INITIATIVE &&
          b.type === TYPES.INITIATIVE
        ) {
          return sortOrderForCost(a.cost) - sortOrderForCost(b.cost);
        }
        return a.priority - b.priority;
      });
    }

    case SORT_ORDER.OPTIONS.START_DATE: {
      return tasks.sort((a, b) => {
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
      return tasks.sort((a, b) => a.createdBy.localeCompare(b.createdBy));
    }

    default:
      return tasks;
  }
};

const getVisibleTasks = createSelector([getSortOrder, filterTasks], (sortOrder, tasks) =>
  sortTasks(tasks.concat(), sortOrder)
);

export default getVisibleTasks;
