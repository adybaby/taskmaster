import { ACTION_TYPES } from '../actions/ActionTypes';

export const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TAGS: {
      return [...action.tags];
    }
    default:
      return state;
  }
};
