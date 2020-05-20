import { DB_STATUS } from '../../constants/Constants';
import { ACTION_TYPES } from './ActionTypes';

import { init } from './dataloader/Db';
import { createFilters } from './filterCreators/FiltersAndSortCreator';
import { setFilters, setFiltersParams } from './FilterActions';
import { setCurrentTabById } from './CurrentTabActions';
import { setFilterBarVisible } from './FilterBarVisibleActions';
import { setSelectedChartById } from './SelectedChartActions';

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

const updateStateFromUriConfiguration = (dispatch, uriConfiguration) => {
  if (typeof uriConfiguration.currentTabId !== 'undefined') {
    dispatch(setCurrentTabById(uriConfiguration.currentTabId));
  }
  if (typeof uriConfiguration.filterBarVisible !== 'undefined') {
    dispatch(setFilterBarVisible(uriConfiguration.filterBarVisible));
  }
  if (typeof uriConfiguration.selectedChartId !== 'undefined') {
    dispatch(setSelectedChartById(uriConfiguration.selectedChartId));
  }
  if (typeof uriConfiguration.filters !== 'undefined') {
    dispatch(setFiltersParams(uriConfiguration.filters));
  }
};

export const initialise = (uriConfiguration) => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  init()
    .then(({ tasks, users, skills, vacancies, interest, contributionLinks, dateRange }) => {
      dispatch(setUsers(users));
      dispatch(setTasks(tasks));
      dispatch(setSkills(skills));
      dispatch(setDateRange(dateRange));
      dispatch(setCurrentUser(users[0]));
      dispatch(setVacancies(vacancies));
      dispatch(setInterest(interest));
      dispatch(setContributionLinks(contributionLinks));
      dispatch(setFilters(createFilters(users, users[0], vacancies, skills)));

      if (uriConfiguration !== null) {
        updateStateFromUriConfiguration(dispatch, uriConfiguration);
      }
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch(setDbStatus(DB_STATUS.ERROR));
};
