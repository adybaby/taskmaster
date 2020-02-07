import {
  getTasks,
  getUser,
  getTask,
  getDriverContributeesAndTheirContribution,
  getEnablerContributeesAndTheirContribution,
  getMap
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

export const findDriverContributeesAndTheirContribution = driver =>
  new Promise((resolve, reject) => {
    getDriverContributeesAndTheirContribution(driver)
      .then(enablersPriorities => resolve(enablersPriorities))
      .catch(e => reject(e));
  });

export const findEnablerContributeesAndTheirContribution = enabler =>
  new Promise((resolve, reject) => {
    getEnablerContributeesAndTheirContribution(enabler)
      .then(initiativesPriorities => resolve(initiativesPriorities))
      .catch(e => reject(e));
  });

export const makeMap = () =>
  new Promise((resolve, reject) => {
    getMap()
      .then(map => resolve(map))
      .catch(e => reject(e));
  });

export const getUserName = () => getUser().name;
