/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { sortTasks } from '../../data/sort/TaskSorter';
import { executeFilterControls } from '../../data/filters/TaskListFilterControls';

const getTaskListFilterControls = (state) => state.taskListfilterControls;
const getTasks = (state) => state.tasks;
const getSortOrder = (state) => state.sortOrder;
const getFilterBarVisible = (state) => state.filterBarVisible;

export const getVisibleTasks = createSelector(
  [getSortOrder, getTasks, getTaskListFilterControls, getFilterBarVisible],
  (sortOrder, tasks, taskListfilterControls, filterBarVisible) =>
    sortTasks(
      executeFilterControls(tasks, taskListfilterControls, filterBarVisible).concat(),
      sortOrder
    )
);
