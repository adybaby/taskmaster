import { loadData, getUser } from './TestData';

export const loadTasks = () => loadData();

export const getUserName = () => getUser().name;

export default loadTasks;
