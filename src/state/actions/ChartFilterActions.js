import { ACTION_TYPES } from '../../constants/Constants';

export const setChartFilterControl = (filterControl) => ({
  type: ACTION_TYPES.SET_CHART_FILTER_CONTROL,
  filterControl,
});

export const setChartFilterControls = (filterControls) => ({
  type: ACTION_TYPES.SET_CHART_FILTER_CONTROLS,
  filterControls,
});
