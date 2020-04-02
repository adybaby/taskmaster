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
  ).selectedId;

  filterControls
    .filter(
      (filterControl) =>
        (filterBarVisible && filterControl.onFilterBar) || !filterControl.onFilterBar
    )
    .forEach((filterControl) => {
      filteredTasks = filterControl.execute(filteredTasks, filterControl, currentTaskType);
    });
  return filteredTasks;
};

export const getVisibleTasks = createSelector(
  [getSortOrder, getTasks, getFilterControls, getFilterBarVisible],
  (sortOrder, tasks, filterControls, filterBarVisible) =>
    sortTasks(executeFilters(tasks, filterControls, filterBarVisible).concat(), sortOrder)
);
