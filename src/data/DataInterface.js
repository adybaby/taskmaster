import * as testDb from './test/TestDb';

const db = testDb;

export const findTasks = searchTerm => db.findTasks(searchTerm);
export const findTask = id => db.findTask(id);
export const findUser = id => db.findUser(id);
export const getCurrentUser = () => db.getCurrentUser();
export const init = () => db.init();
