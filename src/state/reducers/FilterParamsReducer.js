import { ACTION_TYPES } from '../actions/ActionTypes';

export const filterParamsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT_FILTER_PARAMS: {
      return Object.values(action.filters).reduce(
        (filterParams, filter) => ({ ...filterParams, [filter.id]: filter.defaultParams }),
        {}
      );
    }
    case ACTION_TYPES.SET_FILTER_PARAMS: {
      return { ...state, [action.id]: action.params };
    }
    case ACTION_TYPES.SET_FILTERS_PARAMS: {
      return { ...state, ...action.params };
    }
    case ACTION_TYPES.RESET_FILTER_PARAMS: {
      return { ...state, [action.filter.id]: action.filter.defaultParams };
    }
    case ACTION_TYPES.RESET_ALL_FILTER_PARAMS: {
      return Object.keys(state).reduce(
        (filterParams, key) => ({ ...filterParams, [key]: action.filters[key].defaultParams }),
        {}
      );
    }
    default:
      return state;
  }
};
