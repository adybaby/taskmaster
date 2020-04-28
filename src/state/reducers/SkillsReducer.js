import { ACTION_TYPES } from '../../constants/Constants';

export const skillsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SKILLS: {
      return [...action.skills];
    }
    default:
      return state;
  }
};
