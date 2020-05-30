import { ACTION_TYPES } from './ActionTypes';

export const initFilters = (filters) => ({
  type: ACTION_TYPES.INIT_FILTERS,
  filters,
});
