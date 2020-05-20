import { getResourceChartDefinition, DEFAULT_CHART } from '../../constants/Constants';
import { ACTION_TYPES } from '../actions/ActionTypes';

export const selectedChartReducer = (state = DEFAULT_CHART, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SELECTED_CHART: {
      return action.selectedChart;
    }
    case ACTION_TYPES.SET_SELECTED_CHART_BY_ID: {
      return getResourceChartDefinition(action.selectedChartId);
    }
    default:
      return state;
  }
};
