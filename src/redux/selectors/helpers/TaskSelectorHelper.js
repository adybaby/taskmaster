import * as TASK_FILTERS from '../../../constants/TaskFilters';
import * as SORT_ORDER from '../../../constants/SortOrders';
import { sortOrderForType } from '../../../constants/Contributions';
import { sortOrderForCost } from '../../../constants/Costs';
import * as TYPES from '../../../constants/TaskTypes';
import { doesObjectIncludeStr } from '../../../util/StringUtils';
import { filterTasksByDate } from '../../../util/Dates';

const applyDateFilters = (tasks, taskFilters, omitFilter, field) => {
  let filteredTasks = tasks;
  if (
    taskFilters[field].enabled &&
    taskFilters[field].value !== 'ANY_TIME' &&
    omitFilter !== field
  ) {
    filteredTasks = filterTasksByDate(filteredTasks, taskFilters[field].query, field);
  }
  return filteredTasks;
};

export const applyFilters = (taskFilters, tasks, omitFilter, currentUser) => {
  let filteredTasks = tasks;

  if (taskFilters.type.enabled && taskFilters.type.value !== TASK_FILTERS.DEFAULTS.TYPE.value) {
    filteredTasks = filteredTasks.filter((task) => task.type === taskFilters.type.value);
  }

  if (taskFilters.searchTerm.enabled && taskFilters.searchTerm.value !== '') {
    filteredTasks = filteredTasks.filter(doesObjectIncludeStr(taskFilters.searchTerm.value));
  }

  if (taskFilters.filterBar.enabled) {
    if (
      taskFilters.vacancies.enabled &&
      taskFilters.vacancies.value !== TASK_FILTERS.DEFAULTS.VACANCIES.value &&
      omitFilter !== 'vacancies'
    ) {
      const queryVacancies = [];
      if (taskFilters.vacancies.value === 'MY_SKILLS') {
        queryVacancies.push(...currentUser.skills);
      } else queryVacancies.push(taskFilters.vacancies.value);

      filteredTasks = filteredTasks.filter((task) => {
        if (task.vacancies === null) {
          return false;
        }
        for (let taskCounter = 0; taskCounter < task.vacancies.length; taskCounter++) {
          for (let queryCounter = 0; queryCounter < queryVacancies.length; queryCounter++) {
            if (task.vacancies[taskCounter].title.includes(queryVacancies[queryCounter])) {
              return true;
            }
          }
        }
        return false;
      });
    }

    if (
      taskFilters.createdBy.enabled &&
      taskFilters.createdBy.value !== TASK_FILTERS.DEFAULTS.CREATED_BY.value &&
      omitFilter !== 'createdBy'
    ) {
      filteredTasks = filteredTasks.filter(
        (task) => task.createdBy === taskFilters.createdBy.value
      );
    }

    filteredTasks = applyDateFilters(filteredTasks, taskFilters, omitFilter, 'createdDate');
    filteredTasks = applyDateFilters(filteredTasks, taskFilters, omitFilter, 'startDate');
    filteredTasks = applyDateFilters(filteredTasks, taskFilters, omitFilter, 'endDate');
  }
  return filteredTasks;
};

export const sortTasks = (tasks, sortOrder) => {
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
