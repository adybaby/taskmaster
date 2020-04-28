import { ACTION_TYPES, DB_STATUS } from '../../constants/Constants';

export const dbReducer = (state = DB_STATUS.NOT_INITIALISED, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DB_STATUS: {
      return action.status;
    }
    default:
      return state;
  }
};
