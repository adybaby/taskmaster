import { createSelector } from 'reselect';
import { KELLYS_COLORS, DATE_RANGE, FILTER_IDS } from '../../constants/Constants';

const getFilters = (state) => state.filters;
const getCurrentTab = (state) => state.currentTab;
const getFilterParams = (state) => state.filterParams;
const getSkills = (state) => state.skills;

export const getUserSelectedFilters = createSelector(
  [getCurrentTab, getFilters, getFilterParams],
  (currentTab, filters, filterParams) =>
    Object.values(filters).filter(
      (filter) =>
        currentTab !== null &&
        filter.appliesToTab(currentTab.id) &&
        filterParams.find((filterParam) => filterParam.id === filter.id) != null
    )
);

export const getUserSelectedTaskFilters = createSelector([getUserSelectedFilters], (filters) =>
  filters.filter((filter) => filter.isTaskFilter)
);

export const getFiltersForFilterBar = createSelector(
  [getCurrentTab, getFilters],
  (currentTab, filters) =>
    Object.values(filters).filter(
      (filter) => currentTab !== null && filter.appliesToTab(currentTab.id) && filter.isOnFilterBar
    )
);

export const getFiltersForSummary = createSelector([getUserSelectedTaskFilters], (filters) =>
  filters.filter((filter) => !filter.isSortFilter())
);

export const getChartDateRangeFilterParams = createSelector(
  [getFilters, getFilterParams],
  (filters, filterParams) => {
    let chartRangeParams = filterParams.find(
      (filterParam) => filterParam.id === FILTER_IDS.CHART_RANGE
    );
    chartRangeParams =
      chartRangeParams == null
        ? filters[FILTER_IDS.CHART_RANGE].defaultParams
        : chartRangeParams.params;
    return chartRangeParams[0] === DATE_RANGE.CUSTOM_DATES.id
      ? { startDate: chartRangeParams[1], endDate: chartRangeParams[2] }
      : DATE_RANGE[chartRangeParams[0]].range;
  }
);

export const getChartSkillsFilterParams = createSelector(
  [getFilters, getFilterParams, getSkills],
  (filters, filterParams, skills) => {
    let params = filterParams.find((filterParam) => filterParam.id === FILTER_IDS.SKILLS_RANGE);
    params = params == null ? filters[FILTER_IDS.SKILLS_RANGE].defaultParams : params.params;
    return params
      .filter((param) => param.checked)
      .map((param, index) => ({
        id: param.id,
        title: skills.find((skill) => skill.id === param.id).title,
        color: KELLYS_COLORS[index],
        strokeWidth: 15,
      }));
  }
);
