import { ACTION_TYPES } from './ActionTypes';

export const initFilterParams = (filters) => ({
  type: ACTION_TYPES.INIT_FILTER_PARAMS,
  filters,
});

export const resetFilterParams = (filter) => ({
  type: ACTION_TYPES.RESET_FILTER_PARAMS,
  filter,
});

export const resetAllFilterParams = (filters) => ({
  type: ACTION_TYPES.RESET_ALL_FILTER_PARAMS,
  filters,
});

export const setFilterParams = (id, params) => ({
  type: ACTION_TYPES.SET_FILTER_PARAMS,
  id,
  params,
});

export const setFiltersParams = (params) => ({
  type: ACTION_TYPES.SET_FILTERS_PARAMS,
  params,
});
