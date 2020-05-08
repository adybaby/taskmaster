import { ACTION_TYPES } from '../../constants/Constants';

// set filter objects from created state filter objects
export const setFilters = (filters) => ({
  type: ACTION_TYPES.SET_FILTERS,
  filters,
});

// reset  specified filter to its default state (effectively clearing it)
export const resetFilter = (filter) => ({
  type: ACTION_TYPES.RESET_FILTER,
  filter,
});

// reset  all filters to their default state (effectively clearing them all)
export const resetFilters = () => ({
  type: ACTION_TYPES.RESET_FILTERS,
});

// for select filter, params[0] should be
// id of selection option, and params[1 and 2] are option from: to: dates if a date select
export const setFilterParams = (filterId, params) => ({
  type: ACTION_TYPES.SET_FILTER_PARAMS,
  filterId,
  params,
});

// filtersParams is [{filterId, [params]]
// for select filter, params[0] should be
// id of selection option, and params[1 and 2] are option from: to: dates if a date select
export const setFiltersParams = (filtersParams) => ({
  type: ACTION_TYPES.SET_FILTERS_PARAMS,
  filtersParams,
});
