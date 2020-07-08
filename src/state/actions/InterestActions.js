import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';

const updateInterestInState = (interest) => ({
  type: ACTION_TYPES.UPDATE_INTEREST_IN_STATE,
  interest,
});

const deleteInterestFromState = (id) => ({
  type: ACTION_TYPES.DELETE_INTEREST_FROM_STATE,
  id,
});

export const setInterest = (interest) => ({
  type: ACTION_TYPES.SET_INTEREST,
  interest,
});

export const updateInterest = (interest, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.INTEREST, interest)
    .then((response) => {
      dispatch(updateInterestInState(interest));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};

export const deleteInterest = (id, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.DELETE, server.ENTITIES.INTEREST, id)
    .then((response) => {
      dispatch(deleteInterestFromState(id));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};
