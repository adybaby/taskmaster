import { ACTION_TYPES } from '../../constants/Constants';

export const setSelectedChart = (selectedChart) => ({
  type: ACTION_TYPES.SET_SELECTED_CHART,
  selectedChart,
});

export const setSelectedChartById = (selectedChartId) => ({
  type: ACTION_TYPES.SET_SELECTED_CHART_BY_ID,
  selectedChartId,
});
