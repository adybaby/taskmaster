import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';

const addInterestToState = (vacancy) => ({
  type: ACTION_TYPES.ADD_INTEREST_TO_STATE,
  vacancy,
});

const deleteInterestFromState = (id) => ({
  type: ACTION_TYPES.ADD_INTEREST_TO_STATE,
  id,
});

export const setInterest = (interest) => ({
  type: ACTION_TYPES.SET_INTEREST,
  interest,
});

export const addInterest = (interest, successCallback, errorCallback) => (dispatch) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.INTEREST, interest)
    .then((response) => {
      dispatch(addInterestToState(interest));
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
