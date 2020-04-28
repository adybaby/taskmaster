/* eslint-disable no-restricted-globals */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { createSelector } from 'reselect';
import { FILTER_TYPES } from '../../constants/filter/FilterTypes';
import { getAllActiveTaskFilters } from './FilterSelector';

const getTasks = (state) => state.tasks;
const getSortOrder = (state) => state.sortOrder;
const getUsers = (state) => state.users;

const doesObjectIncludeStr = (str) => {
  const escapeRegExp = () => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  const re = new RegExp(escapeRegExp(str), 'i');
  return (srch) => {
    for (const prop in srch) {
      if (!srch.hasOwnProperty(prop)) {
        continue;
      }
      if (re.test(srch[prop])) {
        return true;
      }
    }
    return false;
  };
};

const executeFilterControl = (tasks, filterControl) => {
  switch (filterControl.type) {
    case FILTER_TYPES.SELECT: {
      if (
        typeof filterControl.selectedId !== 'undefined' &&
        filterControl.selectedId !== filterControl.defaultId
      ) {
        const selectedFilter = filterControl.options.find(
          (filter) => filter.id === filterControl.selectedId
        );
        return selectedFilter.execute(tasks, selectedFilter.params);
      }
      break;
    }
    case FILTER_TYPES.TEXT: {
      if (filterControl.text !== '') {
        return tasks.filter(doesObjectIncludeStr(filterControl.text));
      }
      break;
    }
    default: {
      throw new Error(
        `filterControl type: ${filterControl.type} does not match any known filter types`
      );
    }
  }
  return tasks;
};

const sortTasks = (tasks, users, sortOrder) => [
  ...sortOrder.options.find((option) => option.id === sortOrder.selectedId).execute(tasks, users),
];

export const getVisibleTasks = createSelector(
  [getSortOrder, getTasks, getUsers, getAllActiveTaskFilters],
  (sortOrder, tasks, users, activeFilters) =>
    sortTasks(
      activeFilters.reduce(
        (filteredTasks, filterControl) => executeFilterControl(filteredTasks, filterControl),
        tasks
      ),
      users,
      sortOrder
    )
);
