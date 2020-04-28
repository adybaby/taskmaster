import { FILTER_TYPES, CHART_FILTER_CONTROL_IDS } from '../../../constants/Constants';
import { createDateSelectFilterControl } from './controls/DateSelectFilterControl';

export const createChartFilterControls = () => [
  {
    id: CHART_FILTER_CONTROL_IDS.DATE_RANGE_FILTER_ID,
    label: '',
    type: FILTER_TYPES.SELECT,
    ...createDateSelectFilterControl('startDate', true),
  },
];
