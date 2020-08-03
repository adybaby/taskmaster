import { ACTION_TYPES } from '../actions/ActionTypes';

export const taskSummariesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASK_SUMMARIES: {
      return [...action.taskSummaries];
    }
    default:
      return state;
  }
};
