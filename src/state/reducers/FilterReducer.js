import { ACTION_TYPES } from '../../constants/Constants';

export const filterReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTERS: {
      return action.filters;
    }
    case ACTION_TYPES.RESET_FILTERS: {
      return state.map((filter) =>
        filter.isSortFilter() || !filter.isTaskFilter ? filter : filter.new
      );
    }
    case ACTION_TYPES.SET_FILTER_PARAMS: {
      return state.map((filter) =>
        filter.id === action.filterId ? filter.newFilterWithParams(action.params) : filter
      );
    }
    case ACTION_TYPES.SET_FILTERS_PARAMS: {
      return state.map((filter) => {
        const filterIdAndParams = action.filtersParams.find((fp) => fp.filterId === filter.id);
        return typeof filterIdAndParams !== 'undefined'
          ? filter.newFilterWithParams(filterIdAndParams.params)
          : filter;
      });
    }
    default:
      return state;
  }
};
