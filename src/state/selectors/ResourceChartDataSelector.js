import { createSelector } from 'reselect';
import { buildChartData } from './ResourceChartDateBuilder';
import { getFilterBarFilters } from './FilterSelector';

const getTasks = (state) => state.tasks;
const getUsers = (state) => state.users;
const getDateRange = (state) => state.dateRange;

export const calculateResourceChartData = createSelector(
  [getTasks, getUsers, getDateRange, getFilterBarFilters],
  (tasks, users, dateRange, filterBarFilters) => ({
    ...buildChartData(
      tasks,
      users,
      dateRange,
      filterBarFilters[1].getChecked().map((skill) => skill.id),
      filterBarFilters[0].range
    ),
  })
);
