import * as TYPES from '../ActionTypes';

export const filterBarVisibleReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SET_FILTER_BAR_VISIBLE: {
      return action.visible;
    }
    default:
      return state;
  }
};

const resetFilterControl = (filterControl) =>
  filterControl.type === 'TEXT'
    ? { ...filterControl, text: '' }
    : { ...filterControl, selectedFilterId: filterControl.defaultFilterId };

export const filterControlsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.filterControl.id
          ? { ...filterControl, ...action.filterControl }
          : filterControl
      );
    }
    case TYPES.SET_FILTER_CONTROLS: {
      return action.filterControls;
    }
    case TYPES.RESET_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.id ? resetFilterControl(filterControl) : filterControl
      );
    }
    case TYPES.RESET_ALL_FILTER_CONTROLS: {
      return state.map((filterControl) => resetFilterControl(filterControl));
    }
    default:
      return state;
  }
};
