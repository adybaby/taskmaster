import * as TYPES from '../constants/ActionTypes';
import { NOT_INITIALISED } from '../constants/FindStatus';

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
};

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_ALL_USERS: {
      return action.users;
    }
    default:
      return state;
  }
};

export const userStatusReducer = (state = NOT_INITIALISED, action) => {
  switch (action.type) {
    case TYPES.SET_USER_STATUS: {
      return action.userStatus;
    }
    default:
      return state;
  }
};
