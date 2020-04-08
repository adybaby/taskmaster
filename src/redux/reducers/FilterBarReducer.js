import * as TYPES from '../ActionTypes';

export const filterBarVisibleReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SET_FILTER_BAR_VISIBLE: {
      return action.visible;
    }
    default:
      return state;
  }
};
