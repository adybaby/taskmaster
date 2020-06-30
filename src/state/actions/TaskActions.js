import { ACTION_TYPES } from './ActionTypes';

export const setTasks = (tasks) => ({
  type: ACTION_TYPES.SET_TASKS,
  tasks,
});
