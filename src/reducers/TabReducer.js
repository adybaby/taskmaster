import * as TYPES from '../constants/ActionTypes';
import * as TABS from '../constants/Tabs';

export const tabReducer = (state = TABS.DEFAULT, action) => {
  switch (action.type) {
    case TYPES.SET_TAB: {
      return action.tab;
    }
    default:
      return state;
  }
};
