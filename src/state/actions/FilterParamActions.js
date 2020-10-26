import { ACTION_TYPES } from './ActionTypes';

export const resetFilterParams = () => ({ type: ACTION_TYPES.RESET_FILTER_PARAMS });

export const setAllFilterParams = (params) => ({
  type: ACTION_TYPES.SET_ALL_FILTER_PARAMS,
  params,
});

export const setFilterParam = (id, params, filters) => ({
  type: ACTION_TYPES.SET_FILTER_PARAM,
  id,
  params,
  filters,
});
