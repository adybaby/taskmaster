import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';
import { deleteInterest } from './InterestActions';
import * as logger from '../../util/Logger';

const updateVacancyInState = (vacancy) => ({
  type: ACTION_TYPES.UPDATE_VACANCY_IN_STATE,
  vacancy,
});

const deleteVacancyFromState = (id) => ({
  type: ACTION_TYPES.DELETE_VACANCY_FROM_STATE,
  id,
});

export const setVacancies = (vacancies) => ({
  type: ACTION_TYPES.SET_VACANCIES,
  vacancies,
});

export const updateVacancy = (vacancy, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.VACANCY, vacancy)
    .then((response) => {
      dispatch(updateVacancyInState(vacancy));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};

export const deleteVacancy = (id, successCallback, errorCallback) => (dispatch, getState) => {
  const relatedInterests = getState().interest.filter((interest) => interest.vacancyId === id);
  server
    .query(server.ACTIONS.DELETE, server.ENTITIES.VACANCY, id)
    .then((response) => {
      logger.debug(`Deleted vacancy with id: ${id}`);
      relatedInterests.forEach((relatedInterest) => {
        dispatch(
          deleteInterest(
            relatedInterest.id,
            () => {
              logger.debug(
                `Deleted interest with id: ${relatedInterest.id} related to deleted vacancy with id: ${id}`
              );
            },
            errorCallback
          )
        );
      });
      dispatch(deleteVacancyFromState(id));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};
