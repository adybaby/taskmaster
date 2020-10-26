import { DB_STATUS } from '../../constants/Constants';
import { createFilters } from './filterCreators/FiltersAndSortCreator';
import { initFilters } from './FilterActions';
import { setDbStatus } from './DbStatusActions';
import { setTaskSummaries } from './TaskSummariesActions';
import { setSkills } from './SkillActions';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { setUsers } from './UserActions';
import { setTags } from './TagActions';

export const initialise = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));
  Promise.all([
    db.findAll(db.TYPE.USER),
    db.findAll(db.TYPE.SKILL),
    db.findAll(db.TYPE.VACANCY),
    db.getTaskSummaries(),
    db.getTags(),
  ])
    .then((data) => {
      const users = data[0];
      const skills = data[1];
      const vacancies = data[2];
      const taskSummaries = data[3];
      const tags = data[4];
      const filters = createFilters(users, vacancies, skills);
      dispatch(initFilters(filters));
      dispatch(setTaskSummaries(taskSummaries));
      dispatch(setSkills(skills));
      dispatch(setUsers(users));
      dispatch(setTags(tags));
      dispatch(setDbStatus(DB_STATUS.INITIALISED));
    })
    .catch((e) => {
      logger.error('Error initialising database: ', e);
      dispatch(setDbStatus(DB_STATUS.ERROR));
    });
};
