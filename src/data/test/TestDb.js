/* eslint-disable no-param-reassign */
import retrieveTasks from './TestTaskFileLoader';
import retrieveUsers from './TestUserFileLoader';

const escapeRegExp = (
  str // or better use 'escape-string-regexp' package
) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

const doesTaskMatchStr = str => {
  // eslint-disable-next-line no-undef
  const re = new RegExp(escapeRegExp(str), 'i');
  return srch => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in srch) {
      // eslint-disable-next-line no-prototype-builtins
      if (!srch.hasOwnProperty(prop)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (re.test(srch[prop])) {
        return true;
      }
    }
    return false;
  };
};

export const findTasks = searchTerm =>
  new Promise((resolve, reject) => {
    retrieveTasks()
      .then(tasks => {
        if (typeof searchTerm === 'undefined' || searchTerm === null || searchTerm.length < 1) {
          resolve(tasks);
        } else {
          resolve(tasks.filter(doesTaskMatchStr(searchTerm)));
        }
      })
      .catch(e => {
        reject(e);
      });
  });

export const findTask = id =>
  new Promise((resolve, reject) => {
    retrieveTasks()
      .then(tasks => {
        resolve(tasks.filter(element => element.id === id)[0]);
      })
      .catch(e => {
        reject(e);
      });
  });

export const findUser = id =>
  new Promise((resolve, reject) => {
    retrieveUsers()
      .then(users => {
        resolve(users.filter(element => element.id === id)[0]);
      })
      .catch(e => {
        reject(e);
      });
  });

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    retrieveUsers()
      .then(users => {
        resolve(users[0]);
      })
      .catch(e => {
        reject(e);
      });
  });

export const getAllUsers = () =>
  new Promise((resolve, reject) => {
    retrieveUsers()
      .then(users => {
        resolve(users);
      })
      .catch(e => {
        reject(e);
      });
  });
