import * as testDb from './test/TestDb';

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

export const findUser = id =>
  new Promise((resolve, reject) => {
    db.findUser(id)
      .then(user => resolve(user))
      .catch(e => reject(e));
  });

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    db.getCurrentUser()
      .then(user => resolve(user))
      .catch(e => reject(e));
  });

export const getAllUsers = () =>
  new Promise((resolve, reject) => {
    db.getAllUsers()
      .then(users => resolve(users))
      .catch(e => reject(e));
  });
