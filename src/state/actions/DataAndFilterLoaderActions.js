import { DB_STATUS } from '../../constants/Constants';
import { ACTION_TYPES } from './ActionTypes';

import { loadAll, overwriteDbWithJsonFiles as dbOverwrite } from './data/Db';
import { createFilters } from './filterCreators/FiltersAndSortCreator';
import { initFilters } from './FilterActions';
import { initFilterParams } from './FilterParamActions';

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

const setVacancies = (vacancies) => ({
  type: ACTION_TYPES.SET_VACANCIES,
  vacancies,
});

const setInterest = (interest) => ({
  type: ACTION_TYPES.SET_INTEREST,
  interest,
});

const setContributionLinks = (contributionLinks) => ({
  type: ACTION_TYPES.SET_CONTRIBUTION_LINKS,
  contributionLinks,
});

export const initialise = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  loadAll()
    .then(({ tasks, users, skills, vacancies, interest, contributionLinks, dateRange }) => {
      dispatch(setUsers(users));
      dispatch(setTasks(tasks));
      dispatch(setSkills(skills));
      dispatch(setDateRange(dateRange));
      dispatch(setCurrentUser(users[0]));
      dispatch(setVacancies(vacancies));
      dispatch(setInterest(interest));
      dispatch(setContributionLinks(contributionLinks));
      const filters = createFilters(users, users[0], vacancies, skills);
      dispatch(initFilters(filters));
      dispatch(initFilterParams(filters));
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      dispatch(setDbStatus(DB_STATUS.ERROR));
    });
};

export const overwriteDbWithJsonFiles = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  dbOverwrite()
    .then(() => {
      dispatch(setDbStatus(DB_STATUS.OPERATION_COMPLETE));
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
      dispatch(setDbStatus(DB_STATUS.ERROR));
    });
};
