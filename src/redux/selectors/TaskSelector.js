/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { applyFilters, sortTasks } from './helpers/TaskSelectorHelper';

const getTaskFilters = (state) => state.taskFilters;
const getTasks = (state) => state.tasks;
const getSortOrder = (state) => state.sortOrder;
const getCurrentUser = (state) => state.currentUser;

const createTaskSelector = (omitField) =>
  createSelector([getTaskFilters, getTasks, getCurrentUser], (taskFilters, tasks, currentUser) =>
    applyFilters(taskFilters, tasks, omitField, currentUser)
  );

export const getVisibleTasks = createSelector(
  [getSortOrder, createTaskSelector(null)],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);

export const getVisibleTasksOmitVacancies = createSelector(
  [getSortOrder, createTaskSelector('vacancies')],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);

export const getVisibleTasksOmitCreatedBy = createSelector(
  [getSortOrder, createTaskSelector('createdBy')],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);

export const getVisibleTasksOmitCreatedDate = createSelector(
  [getSortOrder, createTaskSelector('createdDate')],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);

export const getVisibleTasksOmitStartDate = createSelector(
  [getSortOrder, createTaskSelector('startDate')],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);

export const getVisibleTasksOmitEndDate = createSelector(
  [getSortOrder, createTaskSelector('endDate')],
  (sortOrder, tasks) => sortTasks(tasks.concat(), sortOrder)
);
