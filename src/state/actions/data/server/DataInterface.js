/* eslint-disable no-console */
import * as server from './ServerInterface';

export const loadAll = () =>
  new Promise((resolve, reject) => {
    const tasksPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.TASK, {});
    const usersPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.USER, {});
    const skillsPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.SKILL, {});
    const vacanciesPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.VACANCY, {});
    const interestPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.INTEREST, {});
    const contributionLinksPromise = server.query(
      server.ACTIONS.FIND,
      server.ENTITIES.CONTRIBUTION,
      {}
    );

    Promise.all([
      tasksPromise,
      usersPromise,
      skillsPromise,
      vacanciesPromise,
      interestPromise,
      contributionLinksPromise,
    ])
      .then((data) => {
        resolve({
          tasks: data[0],
          users: data[1],
          skills: data[2],
          vacancies: data[3],
          interest: data[4],
          contributionLinks: data[5],
        });
      })
      .catch((e) => {
        reject(e);
      });
  });

const findAll = (entityType) =>
  new Promise((resolve, reject) => {
    console.log(`Retrieving ids of all ${entityType}s`);
    server
      .query(server.ACTIONS.FIND, entityType, {})
      .then((results) => {
        console.log(`Retrieved ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const deleteAll = (entityType, entities) =>
  new Promise((resolve, reject) => {
    console.log(`Deleting ${entities.length} ${entityType}s`);
    Promise.all(
      entities.map((entity) => server.query(server.ACTIONS.DELETE, entityType, entity.id))
    )
      .then((results) => {
        console.log(`Deleted ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const updateAll = (entityType, entities) =>
  new Promise((resolve, reject) => {
    console.log(`Updating ${entities.length} ${entityType}s`);
    Promise.all(entities.map((entity) => server.query(server.ACTIONS.UPDATE, entityType, entity)))
      .then((results) => {
        console.log(`Updated ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => {
        reject(e);
      });
  });

const replaceAllEntities = (entityType, entities) =>
  new Promise((resolve, reject) => {
    console.log(`Replacing ${entities.length} ${entityType}s`);
    findAll(entityType)
      .then((entitiesToDelete) => deleteAll(entityType, entitiesToDelete))
      .then(() => updateAll(entityType, entities))
      .then((results) => {
        console.log(`Replaced ${results.length} ${entityType}s`);
        resolve(results);
      })
      .catch((e) => reject(e));
  });

export const overwriteDb = (data) =>
  new Promise((resolve, reject) => {
    console.log('Overwriting data from JSON files');
    console.log(data);
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
