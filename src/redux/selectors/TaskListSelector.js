/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { sortTasks } from '../../data/sort/TaskSorter';
import { executeFilterControls } from '../../data/filters/TaskListFilterControls';

const getTaskListFilterControls = (state) => state.taskListfilterControls;
const getTasks = (state) => state.tasks;
const getSortOrder = (state) => state.sortOrder;

export const getVisibleTasks = createSelector(
  [getSortOrder, getTasks, getTaskListFilterControls],
  (sortOrder, tasks, taskListfilterControls) =>
    sortTasks(executeFilterControls(tasks, taskListfilterControls).concat(), sortOrder)
);
