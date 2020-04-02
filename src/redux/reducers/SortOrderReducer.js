import * as TYPES from '../ActionTypes';
import { DEFAULT_SORTER_ID } from '../../data/sort/TaskSorter';

export const sortOrderReducer = (state = DEFAULT_SORTER_ID, action) => {
  switch (action.type) {
    case TYPES.SET_SORT_ORDER: {
      return action.sortOrder;
    }
    default:
      return state;
  }
};
