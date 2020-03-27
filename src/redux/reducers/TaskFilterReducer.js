import * as TYPES from '../ActionTypes';
import { STATE_INIT } from '../../constants/TaskFilters';

export const taskFilterReducer = (state = STATE_INIT, action) => {
  switch (action.type) {
    case TYPES.SET_TASK_FILTER: {
      const currentFilter = { ...state[action.filter.type], ...action.filter };
      return {
        ...state,
        [action.filter.type]: currentFilter,
      };
    }
    default:
      return state;
  }
};
