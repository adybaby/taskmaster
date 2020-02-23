/* eslint-disable no-param-reassign */
import { retrieveTasks } from './TestTaskFileLoader';
import { retrieveUsers } from './TestUserFileLoader';

let users = null;
let tasks = null;

export const init = () =>
  new Promise((resolve, reject) => {
    retrieveTasks()
      .then(retrievedTasks => {
        retrieveUsers(retrievedTasks).then(retrievedUsers => {
          tasks = retrievedTasks;
          users = retrievedUsers;
          resolve({ users, tasks });
        });
      })
      .catch(e => {
        reject(e);
      });
  });
