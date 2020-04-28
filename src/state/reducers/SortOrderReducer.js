import { ACTION_TYPES } from '../../constants/Constants';

export const sortOrderReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SORT_ORDER: {
      return state === null ? action.sortOrder : { ...state, ...action.sortOrder };
    }
    default:
      return state;
  }
};
