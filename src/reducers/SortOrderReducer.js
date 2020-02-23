import * as TYPES from '../constants/ActionTypes';
import * as SORT_ORDER from '../constants/SortOrders';

export const sortOrderReducer = (state = SORT_ORDER.DEFAULT, action) => {
  switch (action.type) {
    case TYPES.SET_SORT_ORDER: {
      return action.sortOrder;
    }
    default:
      return state;
  }
};
