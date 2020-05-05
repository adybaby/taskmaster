import { createSelector } from 'reselect';
import { FILTER_IDS } from '../../constants/Constants';

const getFilters = (state) => state.filters;
const getCurrentTab = (state) => state.currentTab;

export const getFilterBarFilters = createSelector(
  [getCurrentTab, getFilters],
  (currentTab, filters) =>
    filters.filter((filter) => filter.isOnFilterBar && filter.appliesToTab(currentTab))
);

export const getActiveFilterBarFilters = createSelector(
  [getCurrentTab, getFilterBarFilters],
  (currentTab, filterBarFilters) => filterBarFilters.filter((filter) => filter.isActive(currentTab))
);

export const getAllActiveFilters = createSelector(
  [getCurrentTab, getFilters],
  (currentTab, filters) => filters.filter((filter) => filter.isActive(currentTab))
);

export const getFiltersForSummary = createSelector([getAllActiveFilters], (filters) =>
  filters.filter((filter) => !filter.isSortFilter())
);

export const getSearchFilter = createSelector([getFilters], (filters) =>
  filters.find((filter) => filter.id === FILTER_IDS.SEARCH_FIELD)
);

export const getSearchText = createSelector([getSearchFilter], (filter) => filter.params[0]);
