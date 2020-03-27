import * as TYPES from '../ActionTypes';

export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_TASKS: {
      return action.tasks;
    }
    default:
      return state;
  }
};