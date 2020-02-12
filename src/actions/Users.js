import * as TYPES from '../constants/ActionTypes';
import {
  findUser as findUserFromDb,
  getCurrentUser as getCurrentUserFromDb,
  getAllUsers as getAllUsersFromDb
} from '../data/DataInterface';
import * as STATUS from '../constants/FindStatus';

export const setUserStatus = userStatus => ({
  type: TYPES.SET_USER_STATUS,
  userStatus
});

export const setUser = user => ({
  type: TYPES.SET_USER,
  user
});

export const setAllUsers = users => ({
  type: TYPES.SET_ALL_USERS,
  users
});

export const getCurrentUser = () => dispatch => {
  dispatch(setUserStatus(STATUS.SEARCHING));
  getCurrentUserFromDb()
    .then(user => {
      if (typeof user !== 'undefined' && user !== null) {
        dispatch(setUser(user));
        dispatch(setUserStatus(STATUS.HAVE_RESULTS));
      } else {
        dispatch(setUser(null));
        dispatch(setUserStatus(STATUS.NO_RESULTS));
      }
    })
    .catch(setUserStatus(STATUS.ERROR));
};

export const findUser = id => dispatch => {
  dispatch(setUserStatus(STATUS.SEARCHING));
  findUserFromDb(id)
    .then(user => {
      if (typeof user !== 'undefined' && user !== null) {
        dispatch(setUser(user));
        dispatch(setUserStatus(STATUS.HAVE_RESULTS));
      } else {
        dispatch(setUser(null));
        dispatch(setUserStatus(STATUS.NO_RESULTS));
      }
    })
    .catch(setUserStatus(STATUS.ERROR));
};

export const getAllUsers = () => dispatch => {
  dispatch(setUserStatus(STATUS.SEARCHING));
  getAllUsersFromDb()
    .then(users => {
      if (users !== null) {
        dispatch(setAllUsers(users));
        dispatch(setUserStatus(STATUS.HAVE_RESULTS));
      } else {
        dispatch(setAllUsers(null));
        dispatch(setUserStatus(STATUS.NO_RESULTS));
      }
    })
    .catch(setUserStatus(STATUS.ERROR));
};
