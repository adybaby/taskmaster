import { loadData, getUser } from './test/TestData';

export const loadTasks = callback =>
  loadData()
    .then(data => callback(data))
    .catch(e => new Error(e));

export const getUserName = () => getUser().name;
