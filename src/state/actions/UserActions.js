import { ACTION_TYPES } from './ActionTypes';
import * as server from './data/server/ServerInterface';
import { updateCurrentUser } from './CurrentUserActions';

export const setUsers = (users) => ({
  type: ACTION_TYPES.SET_USERS,
  users,
});

export const addUser = (user, successCallback, errorCallback) => (dispatch, getState) => {
  const newUser = {
    id: user.sub,
    firstNames: [user.given_name],
    lastName: user.family_name,
  };
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.USER, newUser)
    .then((response) => {
      dispatch(setUsers([...getState().users, newUser]));
      successCallback(response);
    })
    .catch((e) => {
      errorCallback(e);
    });
};

export const updateUser = (user, successCallback, errorCallback) => (dispatch, getState) => {
  server
    .query(server.ACTIONS.UPDATE, server.ENTITIES.USER, user)
    .then((response) => {
      if (user.id === getState().currentUser.id) {
        dispatch(updateCurrentUser(user));
        successCallback(response);
      }
    })
    .catch((e) => {
      errorCallback(e);
    });
};
