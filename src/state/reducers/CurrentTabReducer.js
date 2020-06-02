import { DEFAULT_TAB } from '../../constants/Constants';
import { ACTION_TYPES } from '../actions/ActionTypes';

export const currentTabReducer = (state = DEFAULT_TAB, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_TAB: {
      return action.currentTab;
    }
    default:
      return state;
  }
};
