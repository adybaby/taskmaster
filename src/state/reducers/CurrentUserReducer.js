import { ACTION_TYPES } from '../actions/ActionTypes';

export const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_USER: {
      return action.user;
    }
    case ACTION_TYPES.UPDATE_CURRENT_USER: {
      return { ...state, ...action.user };
    }
    default:
      return state;
  }
};
