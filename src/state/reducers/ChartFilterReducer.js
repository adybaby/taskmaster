import { ACTION_TYPES } from '../../constants/Constants';

export const chartFilterControlsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CHART_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.filterControl.id
          ? { ...filterControl, ...action.filterControl }
          : filterControl
      );
    }
    case ACTION_TYPES.SET_CHART_FILTER_CONTROLS: {
      return action.filterControls;
    }
    default:
      return state;
  }
};
