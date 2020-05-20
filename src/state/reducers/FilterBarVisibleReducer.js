import { ACTION_TYPES } from '../actions/ActionTypes';

export const filterBarVisibleReducer = (state = false, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTER_BAR_VISIBLE: {
      return action.visible;
    }
    default:
      return state;
  }
};
