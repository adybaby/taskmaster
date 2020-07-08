import { stringDatesToRealDates } from '../../../../util/Dates';
import config from '../../../../config.json';

const SERVER_URL = config.serverUrl;
const QUERY_URL = `${SERVER_URL}query`;

export const ENTITIES = {
  CONTRIBUTION: 'contribution',
  INTEREST: 'interest',
  SKILL: 'skill',
  TASK: 'task',
  USER: 'user',
  VACANCY: 'vacancy',
};

export const ACTIONS = {
  UPDATE: 'update',
  DELETE: 'delete',
  FIND: 'find',
};

const noQueryMsg = (err = 'Unknown') =>
  `There was a problem executing the query. Error: ${err.message}`;
const noServerMsg = (err = new Error('No error given')) =>
  `There was a problem contacting the TaskMaster server. Is it running? Error: ${err.message}`;
const generalErrMsg = (err = new Error('No error given')) =>
  `There was an unexpected error compiling the query. ${err.message}`;
const nullValueErrMsg = (valueName) =>
  `Cannot execute query: ${valueName} cannot be null or undefined`;

export const query = (action, entity, updateOrQuery) =>
  new Promise((resolve, reject) => {
    if (action == null) {
      reject(nullValueErrMsg('action'));
    }
    if (entity == null) {
      reject(nullValueErrMsg('entity'));
    }
    if (updateOrQuery == null) {
      reject(nullValueErrMsg('updateOrQuery'));
    }
    try {
      fetch(QUERY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, entity, updateOrQuery }),
      })
        .then((res) => {
          switch (res.status) {
            case 200:
              try {
                res
                  .json()
                  .then((data) => {
                    resolve(stringDatesToRealDates(data));
                  })
                  .catch((e) => {
                    reject(noQueryMsg(e));
                  });
              } catch (e) {
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
                  .then((msg) => {
                    reject(noQueryMsg(new Error(msg)));
                  })
                  .catch((e) => {
                    reject(noQueryMsg(e));
                  });
              } catch (e) {
                reject(noQueryMsg(e));
              }
              break;

            default:
              reject(noQueryMsg());
              break;
          }
        })
        .catch((err) => {
          reject(generalErrMsg(err));
        });
    } catch (err) {
      reject(generalErrMsg(err));
    }
  });
