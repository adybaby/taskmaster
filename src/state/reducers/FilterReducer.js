import { ACTION_TYPES } from '../actions/ActionTypes';

export const filterReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT_FILTERS: {
      return action.filters;
    }
    default:
      return state;
  }
};
