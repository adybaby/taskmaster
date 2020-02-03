import {
  getTasks,
  getUser,
  getTask,
  getEnablersPrioritiesForDriver,
  getInitiativesPrioritiesForEnabler
} from './test/TestData';

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

export const findEnablersPriorities = driver =>
  new Promise((resolve, reject) => {
    getEnablersPrioritiesForDriver(driver)
      .then(enablersPriorities => resolve(enablersPriorities))
      .catch(e => reject(e));
  });

export const findInitiativesPriorities = enabler =>
  new Promise((resolve, reject) => {
    getInitiativesPrioritiesForEnabler(enabler)
      .then(initiativesPriorities => resolve(initiativesPriorities))
      .catch(e => reject(e));
  });

export const getUserName = () => getUser().name;
