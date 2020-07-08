import { ACTION_TYPES } from '../actions/ActionTypes';

export const interestReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_INTEREST_IN_STATE: {
      return [...state, action.interest];
    }
    case ACTION_TYPES.DELETE_INTEREST_FROM_STATE: {
      return state.filter((interest) => interest.id !== action.id);
    }
    case ACTION_TYPES.SET_INTEREST: {
      return action.interest;
    }
    default:
      return state;
  }
};
