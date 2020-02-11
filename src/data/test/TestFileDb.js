/* eslint-disable no-param-reassign */
import retrieveTasks from './TestFileLoader';

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

export const findUser = () =>
  new Promise(resolve => {
    resolve({ name: 'aalever' });
  });
