import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';

const addVacancyToState = (vacancy) => ({
  type: ACTION_TYPES.ADD_VACANCY_TO_STATE,
  vacancy,
});

const deleteVacancyFromState = (id) => ({
  type: ACTION_TYPES.ADD_VACANCY_TO_STATE,
  id,
});

export const setVacancies = (vacancies) => ({
  type: ACTION_TYPES.SET_VACANCIES,
  vacancies,
});

export const addVacancy = (vacancy, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.VACANCY, vacancy)
    .then((response) => {
      dispatch(addVacancyToState(vacancy));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};

export const deleteVacancy = (id, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.DELETE, server.ENTITIES.VACANCY, id)
    .then((response) => {
      dispatch(deleteVacancyFromState(id));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};
