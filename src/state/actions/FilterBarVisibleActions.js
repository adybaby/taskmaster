import { ACTION_TYPES } from '../../constants/Constants';

export const setFilterBarVisible = (visible) => ({
  type: ACTION_TYPES.SET_FILTER_BAR_VISIBLE,
  visible,
});
