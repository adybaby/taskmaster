import * as TYPES from '../constants/ActionTypes';

export const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENT_USER: {
      return action.user;
    }
    default:
      return state;
  }
};

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_USERS: {
      return action.users;
    }
    default:
      return state;
  }
};
