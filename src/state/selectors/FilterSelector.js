import { createSelector } from 'reselect';

const getFilters = (state) => state.filters;
const getCurrentTab = (state) => state.currentTab;
const getFilterParams = (state) => state.filterParams;

export const getUserSelectedFilters = createSelector(
  [getCurrentTab, getFilters, getFilterParams],
  (currentTab, filters, filterParams) =>
    Object.values(filters).filter(
      (filter) =>
        filter.appliesToTab(currentTab.id) && !filter.isDefaultParams(filterParams[filter.id])
    )
);

export const getUserSelectedTaskFilters = createSelector([getUserSelectedFilters], (filters) =>
  filters.filter((filter) => filter.isTaskFilter)
);

export const getFiltersForFilterBar = createSelector(
  [getCurrentTab, getFilters],
  (currentTab, filters) =>
    Object.values(filters).filter(
      (filter) => filter.appliesToTab(currentTab.id) && filter.isOnFilterBar
    )
);

export const getFiltersForSummary = createSelector([getUserSelectedTaskFilters], (filters) =>
  filters.filter((filter) => !filter.isSortFilter())
);
