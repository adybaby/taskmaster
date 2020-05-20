import { ACTION_TYPES } from './ActionTypes';

export const setFilterBarVisible = (visible) => ({
  type: ACTION_TYPES.SET_FILTER_BAR_VISIBLE,
  visible,
});
