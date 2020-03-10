import * as TYPES from '../ActionTypes';

export const skillsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_SKILLS: {
      return [...action.skills];
    }
    default:
      return state;
  }
};
