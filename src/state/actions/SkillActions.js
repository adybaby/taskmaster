import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';

const addSkillToState = (skill) => ({
  type: ACTION_TYPES.ADD_SKILL_TO_STATE,
  skill,
});

export const setSkills = (skills) => ({
  type: ACTION_TYPES.SET_SKILLS,
  skills,
});

export const addSkill = (skill, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.SKILL, skill)
    .then((response) => {
      dispatch(addSkillToState(skill));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};
