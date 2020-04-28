import { URLS } from './Urls';
import { TASK_TYPE } from '../field/TaskType';
import { ICONS } from './Icons';

export const TABS = {
  all: {
    id: 'ALL_TAB',
    label: 'All',
    filterSummaryLabel: 'item',
    url: URLS.ALL,
    icon: ICONS.ALL_TAB,
  },
  drivers: {
    id: 'DRIVERS_TAB',
    label: 'Drivers',
    filterSummaryLabel: 'driver',
    url: URLS.DRIVERS,
    taskType: TASK_TYPE.DRIVER,
    icon: ICONS.DRIVER,
  },
  enablers: {
    id: 'ENABLERS_TAB',
    label: 'Enablers',
    filterSummaryLabel: 'enabler',
    url: URLS.ENABLERS,
    taskType: TASK_TYPE.ENABLER,
    icon: ICONS.ENABLER,
  },
  initiatives: {
    id: 'INITIATIVES_TAB',
    label: 'Initiatives',
    filterSummaryLabel: 'initiative',
    url: URLS.INITIATIVES,
    taskType: TASK_TYPE.INITIATIVE,
    icon: ICONS.INITIATIVE,
  },
  map: {
    id: 'MAP_TAB',
    label: 'Map',
    url: URLS.MAP,
    taskType: null,
    icon: ICONS.MAP,
  },
  charts: {
    id: 'CHARTS_TAB',
    label: 'Charts',
    url: URLS.CHARTS,
    taskType: null,
    icon: ICONS.CHARTS,
  },
};

export const DEFAULT_TAB = TABS.all;
