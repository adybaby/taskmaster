import { ACTION_TYPES } from '../actions/ActionTypes';

export const filterParamsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTER_PARAM: {
      const newState = state.filter((param) => param.id !== action.id);
      if (
        JSON.stringify(action.filters[action.id].defaultParams) === JSON.stringify(action.params)
      ) {
        return newState;
      }
      return [...newState, { id: action.id, params: action.params }];
    }
    case ACTION_TYPES.SET_ALL_FILTER_PARAMS: {
      return action.params;
    }
    case ACTION_TYPES.RESET_FILTER_PARAMS: {
      return [];
    }
    default:
      return state;
  }
};
