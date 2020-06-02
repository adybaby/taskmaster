import { ACTION_TYPES } from './ActionTypes';

export const setCurrentTab = (currentTab) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB,
  currentTab,
});
