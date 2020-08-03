import { ACTION_TYPES } from './ActionTypes';

export const setTaskSummaries = (taskSummaries) => ({
  type: ACTION_TYPES.SET_TASK_SUMMARIES,
  taskSummaries,
});
