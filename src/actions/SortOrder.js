import * as TYPES from '../constants/ActionTypes';

export const setSortOrder = sortOrder => ({
  type: TYPES.SET_SORT_ORDER,
  sortOrder
});
