import { ACTION_TYPES } from '../actions/ActionTypes';

export const interestReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INTEREST: {
      return action.interest;
    }
    default:
      return state;
  }
};
