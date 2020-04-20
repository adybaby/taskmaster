import { FILTER_TYPES } from './FilterTypes';
import { createDateSelectFilterControl } from './controls/DateSelectFilterControl';

export const TASK_FILTER_CONTROL_IDS = {
  DATE_RANGE_FILTER_ID: 'DATE_RANGE_FILTER_ID',
};

export const isAFilterActive = (chartFilterControls) =>
  chartFilterControls[0].selectedId !== chartFilterControls[0].defaultId;

export const createChartFilterControls = () => [
  {
    id: TASK_FILTER_CONTROL_IDS.DATE_RANGE_FILTER_ID,
    label: '',
    type: FILTER_TYPES.SELECT,
    ...createDateSelectFilterControl('startDate', true),
  },
];
