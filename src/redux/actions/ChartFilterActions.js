import * as TYPES from '../ActionTypes';

export const setChartFilterControl = (filterControl) => ({
  type: TYPES.SET_CHART_FILTER_CONTROL,
  filterControl,
});

export const setChartFilterControls = (filterControls) => ({
  type: TYPES.SET_CHART_FILTER_CONTROLS,
  filterControls,
});
