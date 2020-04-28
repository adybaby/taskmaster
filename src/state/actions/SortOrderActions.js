import { ACTION_TYPES } from '../../constants/Constants';

export const setSortOrder = (sortOrder) => ({
  type: ACTION_TYPES.SET_SORT_ORDER,
  sortOrder,
});
