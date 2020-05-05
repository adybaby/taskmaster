import { TASK_TYPE } from '../field/TaskType';
import { ICONS } from './Icons';

export const TABS = {
  all: {
    id: 'ALL_TAB',
    label: 'All',
    filterSummaryLabel: 'item',
    taskType: TASK_TYPE.ALL,
    icon: ICONS.ALL_TAB,
  },
  drivers: {
    id: 'DRIVERS_TAB',
    label: 'Drivers',
    filterSummaryLabel: 'driver',
    taskType: TASK_TYPE.DRIVER,
    icon: ICONS.DRIVER,
  },
  enablers: {
    id: 'ENABLERS_TAB',
    label: 'Enablers',
    filterSummaryLabel: 'enabler',
    taskType: TASK_TYPE.ENABLER,
    icon: ICONS.ENABLER,
  },
  initiatives: {
    id: 'INITIATIVES_TAB',
    label: 'Initiatives',
    filterSummaryLabel: 'initiative',
    taskType: TASK_TYPE.INITIATIVE,
    icon: ICONS.INITIATIVE,
  },
  map: {
    id: 'MAP_TAB',
    label: 'Map',
    taskType: null,
    icon: ICONS.MAP,
  },
  charts: {
    id: 'CHARTS_TAB',
    label: 'Charts',
    taskType: null,
    icon: ICONS.CHARTS,
  },
};

export const DEFAULT_TAB = TABS.all;
