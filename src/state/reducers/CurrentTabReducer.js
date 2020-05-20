import { TABS, DEFAULT_TAB } from '../../constants/Constants';
import { ACTION_TYPES } from '../actions/ActionTypes';

export const currentTabReducer = (state = DEFAULT_TAB, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_TAB: {
      return action.currentTab;
    }
    case ACTION_TYPES.SET_CURRENT_TAB_BY_ID: {
      return Object.values(TABS).find((tab) => tab.id === action.currentTabId);
    }
    default:
      return state;
  }
};
