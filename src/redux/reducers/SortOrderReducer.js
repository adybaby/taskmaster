import * as TYPES from '../ActionTypes';
import * as SORT_ORDER from '../../data/sort/TaskSorter';

export const sortOrderReducer = (state = SORT_ORDER.DEFAULT, action) => {
  switch (action.type) {
    case TYPES.SET_SORT_ORDER: {
      return action.sortOrder;
    }
    default:
      return state;
  }
};
