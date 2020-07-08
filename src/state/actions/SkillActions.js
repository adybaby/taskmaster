import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';

const updateSkillInState = (skill) => ({
  type: ACTION_TYPES.UPDATE_SKILL_IN_STATE,
  skill,
});

export const setSkills = (skills) => ({
  type: ACTION_TYPES.SET_SKILLS,
  skills,
});

export const updateSkill = (skill, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.SKILL, skill)
    .then((response) => {
      dispatch(updateSkillInState(skill));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};
