import { DB_STATUS } from '../../constants/Constants';
import { loadAll } from './data/Db';
import { createFilters } from './filterCreators/FiltersAndSortCreator';
import { initFilters } from './FilterActions';
import { initFilterParams } from './FilterParamActions';
import { setUsers } from './UserActions';
import { setTasks } from './TaskActions';
import { setSkills } from './SkillActions';
import { setDbStatus } from './DbStatusActions';
import { setVacancies } from './VacancyActions';
import { setInterest } from './InterestActions';
import { setDateRange } from './DateRangeActions';
import { setContributionLinks } from './ContributionLinkActions';
import * as logger from '../../util/Logger';

export const initialise = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  loadAll()
    .then(({ tasks, users, skills, vacancies, interest, contributionLinks, dateRange }) => {
      dispatch(setUsers(users));
      dispatch(setTasks(tasks));
      dispatch(setSkills(skills));
      dispatch(setDateRange(dateRange));
      dispatch(setVacancies(vacancies));
      dispatch(setInterest(interest));
      dispatch(setContributionLinks(contributionLinks));
      const filters = createFilters(users, users[0], vacancies, skills);
      dispatch(initFilters(filters));
      dispatch(initFilterParams(filters));
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch((e) => {
      logger.error('Error initialising database: ', e);
      dispatch(setDbStatus(DB_STATUS.ERROR));
    });
};
