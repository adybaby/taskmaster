import { createSelector } from 'reselect';
import { buildChartData } from './ResourceChartDateBuilder';
import { FILTER_IDS } from '../../constants/Constants';

const getVacancies = (state) => state.vacancies;
const getInterest = (state) => state.interest;
const getUsers = (state) => state.users;
const getDateRange = (state) => state.dateRange;
const getFilterParams = (state) => state.filterParams;
const getFilters = (state) => state.filters;

export const calculateResourceChartData = createSelector(
  [getVacancies, getInterest, getUsers, getDateRange, getFilters, getFilterParams],
  (vacancies, interest, users, dateRange, filters, filterParams) => {
    const skillRangeFilter = filters[FILTER_IDS.SKILLS_RANGE];
    const skillRangeParams = filterParams[FILTER_IDS.SKILLS_RANGE];
    const chartRangeFilter = filters[FILTER_IDS.CHART_RANGE];
    const chartRangeParams = filterParams[FILTER_IDS.CHART_RANGE];
    const skills = skillRangeFilter.options.filter(
      (option) => skillRangeParams.find((param) => param.id === option.id).checked
    );
    const selectedDateRange = chartRangeFilter.options.find(
      (option) => option.id === chartRangeParams[0]
    );
    const chartRange = selectedDateRange.datePicker
      ? {
          startDate: chartRangeParams[1],
          endDate: chartRangeParams[2],
        }
      : selectedDateRange.range;

    return {
      ...buildChartData(vacancies, interest, users, dateRange, skills, chartRange),
    };
  }
);
