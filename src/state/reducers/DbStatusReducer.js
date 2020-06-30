import { DB_STATUS } from '../../constants/Constants';
import { ACTION_TYPES } from '../actions/ActionTypes';

export const dbStatusReducer = (state = DB_STATUS.NOT_INITIALISED, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DB_STATUS: {
      return action.status;
    }
    default:
      return state;
  }
};
