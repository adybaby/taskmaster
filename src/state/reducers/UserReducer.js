import { ACTION_TYPES } from '../actions/ActionTypes';

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS: {
      return action.users;
    }
    default:
      return state;
  }
};
