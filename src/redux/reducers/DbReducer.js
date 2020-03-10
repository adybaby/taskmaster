import * as TYPES from '../ActionTypes';
import { NOT_INITIALISED } from '../../constants/Db';

export const dbReducer = (state = NOT_INITIALISED, action) => {
  switch (action.type) {
    case TYPES.SET_DB_STATUS: {
      return action.status;
    }
    default:
      return state;
  }
};
