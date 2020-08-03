import { ACTION_TYPES } from './ActionTypes';

export const setSkills = (skills) => ({
  type: ACTION_TYPES.SET_SKILLS,
  skills,
});
