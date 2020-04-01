import * as TYPES from '../ActionTypes';
import { DB_STATUS } from '../../data/db/Db';

export const dbReducer = (state = DB_STATUS.NOT_INITIALISED, action) => {
  switch (action.type) {
    case TYPES.SET_DB_STATUS: {
      return action.status;
    }
    default:
      return state;
  }
};
