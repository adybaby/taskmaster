import { ACTION_TYPES } from './ActionTypes';

export const setCurrentTab = (currentTab) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB,
  currentTab,
});

export const setCurrentTabById = (currentTabId) => ({
  type: ACTION_TYPES.SET_CURRENT_TAB_BY_ID,
  currentTabId,
});
