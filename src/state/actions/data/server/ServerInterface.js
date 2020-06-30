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

const error = (err) => `Could not query the server: ${err}`;

export const query = (action, entity, updateOrQuery) =>
  new Promise((resolve, reject) => {
    fetch(QUERY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, entity, updateOrQuery }),
    }).then((res) => {
      switch (res.status) {
        case 200:
          try {
            res
              .json()
              .then((data) => {
                resolve(stringDatesToRealDates(data));
              })
              .catch((e) => {
                reject(error(e.message));
              });
          } catch (e) {
            reject(error(e.message));
          }
          break;

        case 404:
          reject(new Error('The Taskmaster server could not be found. Is it running?'));
          break;

        case 500:
          try {
            res
              .json()
              .then((msg) => {
                reject(error(msg));
              })
              .catch((e) => {
                reject(error(e.message));
              });
          } catch (e) {
            reject(error(e.message));
          }
          break;

        default:
          reject(error('Unknown error when querying server.'));
          break;
      }
    });
  });
