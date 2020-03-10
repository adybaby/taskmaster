import * as TYPES from '../ActionTypes';

export const dateRangeReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_DATE_RANGE: {
      return action.dateRange;
    }
    default:
      return state;
  }
};
