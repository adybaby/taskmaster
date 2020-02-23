import * as TYPES from '../constants/ActionTypes';
import { STATE_INIT } from '../constants/TaskFilters';

export const taskFilterReducer = (state = STATE_INIT, action) => {
  switch (action.type) {
    case TYPES.SET_TASK_FILTER: {
      const value =
        typeof action.filter.value === 'undefined'
          ? state[action.filter.type].value
          : action.filter.value;
      const enabled =
        typeof action.filter.enabled === 'undefined'
          ? state[action.filter.type].enabled
          : action.filter.enabled;
      return {
        ...state,
        [action.filter.type]: { value, enabled }
      };
    }
    default:
      return state;
  }
};
