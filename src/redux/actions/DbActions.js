import * as TYPES from '../ActionTypes';
import { init, DB_STATUS } from '../../data/db/Db';

import { createTaskFilterControls } from '../../data/filters/TaskListFilterControls';
import { createChartFilterControls } from '../../data/filters/ChartFilterControls';
import { setTaskListFilterControls } from './TaskListFilterActions';
import { setChartFilterControls } from './ChartFilterActions';

const setDbStatus = (status) => ({
  type: TYPES.SET_DB_STATUS,
  status,
});

const setTasks = (tasks) => ({
  type: TYPES.SET_TASKS,
  tasks,
});

const setCurrentUser = (user) => ({
  type: TYPES.SET_CURRENT_USER,
  user,
});

const setUsers = (users) => ({
  type: TYPES.SET_USERS,
  users,
});

const setSkills = (skills) => ({
  type: TYPES.SET_SKILLS,
  skills,
});

const setDateRange = (dateRange) => ({
  type: TYPES.SET_DATE_RANGE,
  dateRange,
});

export const initialise = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  init()
    .then(({ users, tasks, skills, dateRange }) => {
      dispatch(setUsers(users));
      dispatch(setTasks(tasks));
      dispatch(setSkills(skills));
      dispatch(setDateRange(dateRange));
      dispatch(setCurrentUser(users[0]));
      dispatch(setChartFilterControls(createChartFilterControls()));
      dispatch(setTaskListFilterControls(createTaskFilterControls(tasks, users, users[0])));
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch(setDbStatus(DB_STATUS.ERROR));
};
