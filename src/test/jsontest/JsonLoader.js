import { stringDatesToRealDates } from '../../util/Dates';

import * as server from '../../state/actions/data/server/ServerInterface';
import tasksFile from './tasks.json';
import usersFile from './users.json';
import contributionLinksFile from './contribution_links.json';
import vacanciesFile from './vacancies.json';
import interestFile from './interest.json';
import skillsFile from './skills.json';
import * as logger from '../../util/Logger';
import { setDbStatus, DB_STATUS } from '../../state/actions/DbStatusActions';

export const loadAll = () =>
  new Promise((resolve) => {
    const tasks = stringDatesToRealDates(tasksFile);
    const users = stringDatesToRealDates(usersFile);
    const skills = stringDatesToRealDates(skillsFile).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const vacancies = stringDatesToRealDates(vacanciesFile);
    const interest = stringDatesToRealDates(interestFile);
    const contributionLinks = stringDatesToRealDates(contributionLinksFile);

    resolve({
      tasks,
      users,
      skills,
      vacancies,
      interest,
      contributionLinks,
    });
  });

const findAll = (entityType) =>
  new Promise((resolve, reject) => {
    logger.log(`Retrieving ids of all ${entityType}s`);
    server
      .query(server.ACTIONS.FIND, entityType, {})
      .then((results) => {
        logger.log(`Retrieved ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const deleteAll = (entityType, entities) =>
  new Promise((resolve, reject) => {
    logger.log(`Deleting ${entities.length} ${entityType}s`);
    Promise.all(
      entities.map((entity) => server.query(server.ACTIONS.DELETE, entityType, entity.id))
    )
      .then((results) => {
        logger.log(`Deleted ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const updateAll = (entityType, entities) =>
  new Promise((resolve, reject) => {
    logger.log(`Updating ${entities.length} ${entityType}s`);
    Promise.all(entities.map((entity) => server.query(server.ACTIONS.UPDATE, entityType, entity)))
      .then((results) => {
        logger.log(`Updated ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const replaceAllEntities = (entityType, entities) =>
  new Promise((resolve, reject) => {
    logger.log(`Replacing ${entities.length} ${entityType}s`);
    findAll(entityType)
      .then((entitiesToDelete) => deleteAll(entityType, entitiesToDelete))
      .then(() => updateAll(entityType, entities))
      .then((results) => {
        logger.log(`Replaced ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => reject(e));
  });

const overwriteDb = (data) =>
  new Promise((resolve, reject) => {
    logger.log('Overwriting data from JSON files..');
    logger.log(data);
    Promise.all([
      replaceAllEntities(server.ENTITIES.TASK, data.tasks),
      replaceAllEntities(server.ENTITIES.USER, data.users),
      replaceAllEntities(server.ENTITIES.SKILL, data.skills),
      replaceAllEntities(server.ENTITIES.VACANCY, data.vacancies),
      replaceAllEntities(server.ENTITIES.INTEREST, data.interest),
      replaceAllEntities(server.ENTITIES.CONTRIBUTION, data.contributionLinks),
    ])
      .then(() => resolve())
      .catch((e) => reject(e));
  });

export const overwriteDbWithJsonFiles = () => (dispatch) => {
  dispatch(setDbStatus(DB_STATUS.INITIALISING));

  loadAll()
    .then((data) => {
      overwriteDb(data)
        .then(() => dispatch(setDbStatus(DB_STATUS.OPERATION_COMPLETE)))
        .catch((e) => {
          logger.error('Error overwriting database: ', e);
          dispatch(setDbStatus(DB_STATUS.ERROR));
        });
    })
    .catch((e) => {
      logger.error('Error overwriting database: ', e);
      dispatch(setDbStatus(DB_STATUS.ERROR));
    });
};
