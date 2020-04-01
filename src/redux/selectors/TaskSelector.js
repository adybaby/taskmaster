/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { sortTasks } from '../../data/sort/TaskSorter';
import { FILTER_IDS } from '../../data/filters/Filters';

const getFilterControls = (state) => state.filterControls;
const getTasks = (state) => state.tasks;
const getSortOrder = (state) => state.sortOrder;
const getFilterBarVisible = (state) => state.filterBarVisible;

export const executeFilters = (tasks, filterControls, filterBarVisible) => {
  let filteredTasks = tasks;
  const currentTaskType = filterControls.find(
    (filterControl) => filterControl.id === FILTER_IDS.TYPE
  ).selectedFilterId;

  filterControls
    .filter(
      (filterControl) =>
        (filterBarVisible && filterControl.onFilterBar) || !filterControl.onFilterBar
    )
    .forEach((filterControl) => {
      switch (filterControl.type) {
        case 'SELECT': {
          if (
            filterControl.selectedFilterId !== filterControl.defaultFilterId &&
            (typeof filterControl.forTaskTypes === 'undefined' ||
              filterControl.forTaskTypes.includes(currentTaskType))
          ) {
            const selectedFilter = filterControl.filters.find(
              (filter) => filter.id === filterControl.selectedFilterId
            );
            filteredTasks = selectedFilter.execute(filteredTasks, filterControl.params);
          }
          break;
        }
        case 'TEXT': {
          if (filterControl.text !== '') {
            filteredTasks = filterControl.execute(filteredTasks, filterControl.text);
          }
          break;
        }
        default: {
          throw new Error(
            `filterControl type: ${filterControl.type} does not match any know filter types`
          );
        }
      }
    });
  return filteredTasks;
};

export const getVisibleTasks = createSelector(
  [getSortOrder, getTasks, getFilterControls, getFilterBarVisible],
  (sortOrder, tasks, filterControls, filterBarVisible) =>
    sortTasks(executeFilters(tasks, filterControls, filterBarVisible).concat(), sortOrder)
);
