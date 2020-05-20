import { ACTION_TYPES } from '../actions/ActionTypes';

export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASKS: {
      return action.tasks;
    }
    default:
      return state;
  }
};
