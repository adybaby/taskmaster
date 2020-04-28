import { ACTION_TYPES } from '../../constants/Constants';

export const dateRangeReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATE_RANGE: {
      return action.dateRange;
    }
    default:
      return state;
  }
};
