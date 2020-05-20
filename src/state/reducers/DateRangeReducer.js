import { ACTION_TYPES } from '../actions/ActionTypes';

export const dateRangeReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATE_RANGE: {
      return action.dateRange;
    }
    default:
      return state;
  }
};
