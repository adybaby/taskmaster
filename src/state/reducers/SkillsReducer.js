import { ACTION_TYPES } from '../actions/ActionTypes';

export const skillsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SKILLS: {
      return [...action.skills];
    }
    default:
      return state;
  }
};
