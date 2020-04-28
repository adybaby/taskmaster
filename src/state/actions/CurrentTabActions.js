import { ACTION_TYPES } from '../../constants/Constants';

export const setCurrentTab = (currentTab) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB,
  currentTab,
});
