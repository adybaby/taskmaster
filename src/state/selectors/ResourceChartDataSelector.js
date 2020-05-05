/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { buildChartData } from './ResourceChartDateBuilder';
import { getFilterBarFilters } from './FilterSelector';

const getTasks = (state) => state.tasks;
const getUsers = (state) => state.users;
const getDateRange = (state) => state.dateRange;
const getSkills = (state) => state.skills;
// const getVisibleTask = useSelector(getVisibleTasks);

export const calculateResourceChartData = createSelector(
  [getTasks, getUsers, getDateRange, getSkills, getFilterBarFilters],
  (tasks, users, dateRange, skills, filterBarFilters) => {
    return {
      ...buildChartData(tasks, users, dateRange, skills, filterBarFilters[0].range),
    };
  }
);
