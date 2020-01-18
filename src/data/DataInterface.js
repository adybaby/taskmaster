import { getTasks, getUser } from './test/TestData';

export const findTasks = (searchTerm, callback) =>
  getTasks(searchTerm)
    .then(data => callback(data))
    .catch(e => new Error(e));

export const getUserName = () => getUser().name;
