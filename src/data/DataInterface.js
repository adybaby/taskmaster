import { getTasks, getUser, getTask } from './test/TestData';

export const findTasks = searchTerm =>
  new Promise((resolve, reject) => {
    getTasks(searchTerm)
      .then(tasks => resolve(tasks))
      .catch(e => reject(e));
  });

export const findTask = id =>
  new Promise((resolve, reject) => {
    getTask(id)
      .then(task => resolve(task))
      .catch(e => reject(e));
  });

export const getUserName = () => getUser().name;
