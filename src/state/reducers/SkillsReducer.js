import { ACTION_TYPES } from '../actions/ActionTypes';

export const skillsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SKILLS: {
      return [...action.skills];
    }
    case ACTION_TYPES.UPDATE_SKILL_IN_STATE: {
      return [...state, action.skill];
    }
    default:
      return state;
  }
};
