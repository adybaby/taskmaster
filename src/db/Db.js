/* eslint-disable no-underscore-dangle */
// import { loadAll as loadAllFromServer } from './server/DataInterface';
// import { denormaliseLinks } from './Denormaliser';
// import { prioritise } from './Prioritiser';
// import { firstLastDates } from '../../../util/Dates';
// import { store } from '../../Store';
// import { formatUserName } from '../../../util/Users';
// import { VACANCY_STATUS } from '../../../constants/Constants';
// const state = store.getState();
import { v4 as uuid } from 'uuid';
import { store } from '../state/Store';
import { stringDatesToRealDates } from '../util/Dates';
import config from '../config.json';
import * as logger from '../util/Logger';
import { setTaskSummaries } from '../state/actions/TaskSummariesActions';
import { setSkills } from '../state/actions/SkillActions';
import { TYPE as PKG_TYPE } from './Type';
import { schema } from './Schema';
import { setUsers } from '../state/actions/UserActions';
import { setTags } from '../state/actions/TagActions';
import { setCurrentUser } from '../state/actions/CurrentUserActions';

const SERVER_URL = config.serverUrl;
const QUERY_URL = `${SERVER_URL}query`;

export const TYPE = PKG_TYPE;

const ACTION = {
  // Get all task summaries..
  TASK_SUMMARIES: 'summaries',

  // Get filtered chart data..
  // optional: params: {
  //                     filterSkills[{id:skillId, title:skillTitle}],
  //                     filterDateRange:{startDate, endDate}
  //                    }
  CHART: 'chart',

  // Get a task map..
  MAP: 'map',

  // Get all the tags current used in tasks..
  TAGS: 'tags',

  // Get an expanded task record of the given id..
  // required: id
  FULL_TASK: 'task',

  // Get an expanded user record of the given id..
  // required: id
  FULL_USER: 'user',

  // Upsert an entity of the given type of params.id with the fields in params..
  // required: type: One of db.TYPE
  // required: params: {id, ... }
  UPSERT: 'upsert',

  // Upsert many entities matching the ids of the provided entities of the provided type
  // required: type: One of db.TYPE
  // required: params: [{id, ... }]
  UPSERT_MANY: 'upsertMany',

  // Delete an entity of the given type with the given id
  // required: type: One of db.TYPE
  // required: id
  DELETE: 'delete',

  // Get all entities of a given type..
  // required: type: One of db.TYPE
  // required: params: {id, ... }
  FIND_ALL: 'all',

  // Get one entity of a given type with given id...
  // required: type: One of db.TYPE
  // required: params: {id, ... }
  FIND_ONE: 'one',

  // Replace all contribution links for a given task (id) with the provided newLinks
  // required: params: {id ,newLinks:[id, ...] }
  SET_CONTRIBUTIONS: 'setContributions',
};

const noQueryMsg = (err = 'Unknown') =>
  `There was a problem executing the query. Error: ${err.message}`;
const noServerMsg = (err = new Error('No error given')) =>
  `There was a problem contacting the TaskMaster server. Is it running? Error: ${err.message}`;
const generalErrMsg = (err = new Error('No error given')) =>
  `There was an unexpected error compiling the query. ${err.message}`;
const logCantQuery = (e) => {
  logger.error('Could not execute query. ', e == null ? new Error('No Error Given') : e);
};

// If no id is provided, adds a new one and a creation date.
// Inserts a modified data and user id
// Trims the object to only that allowed by the schema
const prepareForUpsert = (type, update) => {
  const preparedUpdate = {};

  if (update.id == null) {
    preparedUpdate.id = uuid();
    preparedUpdate.createdDate = new Date();
    preparedUpdate.createdBy = store.getState().currentUser.id;
    schema[type]
      .filter((field) => field.required)
      .forEach((field) => {
        if (update[field.fieldName] == null) {
          throw new Error(
            `Can't add a new '${type}' because the mandatory '${field.fieldName}' field was not provided.`
          );
        }
      });
  }

  schema[type].forEach((field) => {
    if (update[field.fieldName] != null) {
      preparedUpdate[field.fieldName] = update[field.fieldName];
      preparedUpdate.modifiedDate = new Date();
      preparedUpdate.modifiedBy = store.getState().currentUser.id;
    }
  });
  return preparedUpdate;
};

// See Db.ACTION for params info
const query = ({ action, type, id, params }) =>
  new Promise((resolve, reject) => {
    try {
      let preparedParams = params;
      if (action === ACTION.UPSERT) {
        preparedParams = prepareForUpsert(type, params);
      }
      if (action === ACTION.UPSERT_MANY) {
        preparedParams = params.map((param) => prepareForUpsert(type, param));
      }
      const body = JSON.stringify({ action, type, id, params: preparedParams });
      logger.debug(`Sending ${body} to server.`);
      fetch(QUERY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then((res) => {
          switch (res.status) {
            case 200:
              try {
                res
                  .json()
                  .then((data) => {
                    logger.debug(`Received reply for ${body} from server: `, data);
                    resolve(stringDatesToRealDates(data));
                  })
                  .catch((e) => {
                    logCantQuery(e);
                    reject(noQueryMsg(e));
                  });
              } catch (e) {
                logCantQuery(e);
                reject(noQueryMsg(e));
              }
              break;

            case 404:
              reject(noServerMsg());
              break;

            case 500:
              try {
                res
                  .json()
                  .then((e) => {
                    logCantQuery(e);
                    reject(e);
                  })
                  .catch((e) => {
                    logCantQuery(e);
                    reject(e);
                  });
              } catch (e) {
                logCantQuery(e);
                reject(e);
              }
              break;

            default:
              logCantQuery();
              reject(noQueryMsg());
              break;
          }
        })
        .catch((e) => {
          logCantQuery(generalErrMsg(e));
          reject(generalErrMsg(e));
        });
    } catch (e) {
      logCantQuery(generalErrMsg(e));
      reject(generalErrMsg(e));
    }
  });

// finders

export const getChart = (params) => query({ action: ACTION.CHART, params });

export const getMap = () => query({ action: ACTION.MAP });

export const getTags = () => query({ action: ACTION.TAGS });

export const getTaskSummaries = () => query({ action: ACTION.TASK_SUMMARIES });

export const getFullTask = (id) => query({ action: ACTION.FULL_TASK, id });

export const getFullUser = (id) => query({ action: ACTION.FULL_USER, id });

export const findAll = (type) => query({ action: ACTION.FIND_ALL, type });

export const findOne = (type, id) => query({ action: ACTION.FIND_ONE, type, id });

// modifiers

// Runs query (upsert or delete) and updates state
// Runs queryAction then dispatchAction with the results of queryAction, or the results of cacheQueryAction if that is provided
const udpateThenRefreshState = ({ updateQuery, stateRefreshers }) =>
  new Promise((resolve, reject) => {
    updateQuery()
      .then((results) => {
        Promise.all(stateRefreshers.map((su) => su()))
          .then(() => {
            resolve(results);
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });

const refreshAllInState = (type, dispatch) =>
  new Promise((resolve, reject) => {
    query({ action: ACTION.FIND_ALL, type })
      .then((results) => {
        store.dispatch(dispatch(results));
        resolve(results);
      })
      .catch((e) => {
        logger.error(e);
        reject(
          new Error(
            `Could not local refresh cache for type ${type}  The nested error is : ${e.message}`
          )
        );
      });
  });

const refreshTaskSummaries = () =>
  new Promise((resolve, reject) => {
    query({ action: ACTION.TASK_SUMMARIES })
      .then((taskSummaries) => {
        store.dispatch(setTaskSummaries(taskSummaries));
        resolve(taskSummaries);
      })
      .catch((e) => {
        logger.error(e);
        reject(
          new Error(`Could not local refresh task summaries. The nested error is : ${e.message}`)
        );
      });
  });

const refreshCurrentUser = () =>
  new Promise((resolve, reject) => {
    query({ action: ACTION.FULL_USER, id: store.getState().currentUser.id })
      .then((user) => {
        store.dispatch(setCurrentUser(user));
        resolve(user);
      })
      .catch((e) => {
        logger.error(e);
        reject(new Error(`Could not refresh current user.  The nested error is : ${e.message}`));
      });
  });
const refreshUsers = () => refreshAllInState(TYPE.USER, setUsers);
const refreshSkills = () => refreshAllInState(TYPE.SKILL, setSkills);
const refreshTags = () =>
  new Promise((resolve, reject) => {
    query({ action: ACTION.TAGS })
      .then((tags) => {
        store.dispatch(setTags(tags));
        resolve(tags);
      })
      .catch((e) => {
        logger.error(e);
        reject(new Error(`Could not refresh tags.  The nested error is : ${e.message}`));
      });
  });

export const updateTaskPriorities = (tasks) =>
  query({ action: ACTION.UPSERT_MANY, type: TYPE.TASK, params: tasks });

export const upsertUser = (user) =>
  udpateThenRefreshState({
    updateQuery: () => query({ action: ACTION.UPSERT, type: TYPE.USER, params: user }),
    stateRefreshers: [refreshUsers, refreshCurrentUser],
  });

export const upsertVacancy = (vacancy) =>
  udpateThenRefreshState({
    updateQuery: () => query({ action: ACTION.UPSERT, type: TYPE.VACANCY, params: vacancy }),
    stateRefreshers: [refreshTaskSummaries, refreshUsers],
  });

export const upsertInterest = (interest) =>
  udpateThenRefreshState({
    updateQuery: () => query({ action: ACTION.UPSERT, type: TYPE.INTEREST, params: interest }),
    stateRefreshers: [refreshUsers, refreshCurrentUser],
  });

export const upsertContributionLink = (contributionLink) =>
  udpateThenRefreshState({
    updateQuery: () =>
      query({ action: ACTION.UPSERT, type: TYPE.CONTRIBUTION, params: contributionLink }),
    stateRefreshers: [refreshTaskSummaries],
  });

export const upsertContributionLinks = (taskId, contributesTo, contributions) =>
  udpateThenRefreshState({
    updateQuery: () =>
      query({
        action: ACTION.SET_CONTRIBUTIONS,
        params: {
          id: taskId,
          newLinks: [
            ...contributesTo.map((ct) => ({
              id: ct._id,
              contributorId: taskId,
              contributeeId: ct.id,
              contribution: ct.contribution,
            })),
            ...contributions.map((ct) => ({
              id: ct._id,
              contributorId: ct.id,
              contributeeId: taskId,
              contribution: ct.contribution,
            })),
          ],
        },
      }),
    stateRefreshers: [refreshTaskSummaries, refreshTags, refreshUsers, refreshCurrentUser],
  });

const upsertTaskOnly = (task) =>
  new Promise((resolve, reject) => {
    query({ action: ACTION.UPSERT, type: TYPE.TASK, params: task })
      .then((updatedTask) => {
        resolve(updatedTask);
      })
      .catch((e) => {
        reject(new Error(`Could not update task. ${e}`));
      });
  });

export const upsertTask = (task) =>
  new Promise((resolve, reject) => {
    if (task.contributesTo != null || task.contributions != null) {
      upsertContributionLinks(task.id, task.contributesTo, task.contributions)
        .then(() => {
          upsertTaskOnly(task)
            .then((res) => {
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(
            new Error(`There was a problem updating the contributions for this task. ${e.message}`)
          );
        });
    } else {
      upsertTaskOnly(task)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });

export const upsertSkill = (skill) =>
  udpateThenRefreshState({
    updateQuery: () => query({ action: ACTION.UPSERT, type: TYPE.SKILL, params: skill }),
    stateRefreshers: [refreshSkills],
  });

export const deleteTask = (taskId) =>
  udpateThenRefreshState({
    updateQuery: () => query({ action: ACTION.DELETE, type: TYPE.TASK, id: taskId }),
    stateRefreshers: [refreshTaskSummaries],
  });

export const deleteOne = (type, id) => query({ action: ACTION.DELETE, type, id });

export const upsert = (type, params) => query({ action: ACTION.UPSERT, type, params });
