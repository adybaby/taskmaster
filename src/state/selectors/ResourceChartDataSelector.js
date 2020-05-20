import { createSelector } from 'reselect';
import { buildChartData } from './ResourceChartDateBuilder';
import { getFilterBarFilters } from './FilterSelector';

const getVacancies = (state) => state.vacancies;
const getInterest = (state) => state.interest;
const getUsers = (state) => state.users;
const getDateRange = (state) => state.dateRange;

export const calculateResourceChartData = createSelector(
  [getVacancies, getInterest, getUsers, getDateRange, getFilterBarFilters],
  (vacancies, interest, users, dateRange, filterBarFilters) => ({
    ...buildChartData(
      vacancies,
      interest,
      users,
      dateRange,
      filterBarFilters[1].getChecked(),
      filterBarFilters[0].range
    ),
  })
);
