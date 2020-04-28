import { ACTION_TYPES } from '../../constants/Constants';

export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASKS: {
      return action.tasks;
    }
    default:
      return state;
  }
};
