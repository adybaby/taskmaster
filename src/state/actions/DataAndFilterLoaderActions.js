import { ACTION_TYPES, DB_STATUS } from '../../constants/Constants';

import { init } from './dataloader/Db';

import { createTaskFilterControls } from './filterCreators/TaskListFilterControlsCreator';
import { createChartFilterControls } from './filterCreators/ChartFilterControlsCreator';
import { createSortControl } from './filterCreators/SortControlCreator';
import { setTaskListFilterControls } from './TaskListFilterActions';
import { setChartFilterControls } from './ChartFilterActions';
import { setSortOrder } from './SortOrderActions';

const setDbStatus = (status) => ({
  type: ACTION_TYPES.SET_DB_STATUS,
  status,
});

const setTasks = (tasks) => ({
  type: ACTION_TYPES.SET_TASKS,
  tasks,
});

const setCurrentUser = (user) => ({
  type: ACTION_TYPES.SET_CURRENT_USER,
  user,
});

const setUsers = (users) => ({
  type: ACTION_TYPES.SET_USERS,
  users,
});

const setSkills = (skills) => ({
  type: ACTION_TYPES.SET_SKILLS,
  skills,
});

const setDateRange = (dateRange) => ({
  type: ACTION_TYPES.SET_DATE_RANGE,
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
      dispatch(setSortOrder(createSortControl()));
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch(setDbStatus(DB_STATUS.ERROR));
};
