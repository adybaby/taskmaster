import { ACTION_TYPES, DEFAULT_TAB } from '../../constants/Constants';

export const currentTabReducer = (state = DEFAULT_TAB, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_TAB: {
      return action.currentTab;
    }
    default:
      return state;
  }
};
