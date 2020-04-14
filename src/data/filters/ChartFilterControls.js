import { FILTER_TYPES } from './FilterTypes';
import { createYearSelectFilterControl } from './controls/YearSelectFilterControl';

export const TASK_FILTER_CONTROL_IDS = {
  YEAR_SELECT_FILTER_ID: 'YEAR_SELECT_FILTER_ID',
};

export const isAFilterActive = (chartFilterControls) =>
  chartFilterControls[0].selectedId !== chartFilterControls[0].defaultId;

export const createChartFilterControls = () => [
  {
    id: TASK_FILTER_CONTROL_IDS.YEAR_SELECT_FILTER_ID,
    label: '',
    type: FILTER_TYPES.SELECT,
    ...createYearSelectFilterControl(),
  },
];
