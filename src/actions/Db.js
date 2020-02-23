import * as TYPES from '../constants/ActionTypes';
import * as DB from '../constants/Db';
import { init } from '../data/DataInterface';

const setDbStatus = status => ({
  type: TYPES.SET_DB_STATUS,
  status
});

const setTasks = tasks => ({
  type: TYPES.SET_TASKS,
  tasks
});

const setCurrentUser = user => ({
  type: TYPES.SET_CURRENT_USER,
  user
});

const setUsers = users => ({
  type: TYPES.SET_USERS,
  users
});

export const initialise = () => dispatch => {
  dispatch(setDbStatus(DB.INITIALISING));
  init()
    .then(({ users, tasks }) => {
      dispatch(setTasks(tasks));
      dispatch(setUsers(users));
      dispatch(setCurrentUser(users[0]));
      dispatch(setDbStatus(DB.INITIALISED));
    })
    .catch(setDbStatus(DB.ERROR));
};
