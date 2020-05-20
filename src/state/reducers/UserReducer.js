import { ACTION_TYPES } from '../actions/ActionTypes';

export const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_USER: {
      return action.user;
    }
    default:
      return state;
  }
};

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS: {
      return action.users;
    }
    default:
      return state;
  }
};
