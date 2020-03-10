/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { buildChartData } from './helpers/ResourceChartDateHelper';

const getTasks = state => state.tasks;
const getUsers = state => state.users;
const getDateRange = state => state.dateRange;
const getSkills = state => state.skills;

export const calculateResourceChartData = createSelector(
  [getTasks, getUsers, getDateRange, getSkills],
  (tasks, users, dateRange, skills) => {
    return buildChartData(tasks, users, dateRange, skills);
  }
);
