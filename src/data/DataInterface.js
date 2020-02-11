import * as testDb from './test/TestFileDb';

const db = testDb;

export const findTasks = searchTerm =>
  new Promise((resolve, reject) => {
    db.findTasks(searchTerm)
      .then(tasks => resolve(tasks))
      .catch(e => reject(e));
  });

export const findTask = id =>
  new Promise((resolve, reject) => {
    db.findTask(id)
      .then(task => resolve(task))
      .catch(e => reject(e));
  });

export const findUser = () =>
  new Promise((resolve, reject) => {
    db.findUser()
      .name()
      .then(user => resolve(user))
      .catch(e => reject(e));
  });
