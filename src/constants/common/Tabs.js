import { ICONS } from './Icons';

export const TABS = {
  all: {
    id: 'all',
    label: 'All',
    filterSummaryLabel: 'item',
    taskType: 'ALL',
    icon: ICONS.ALL_TAB,
  },
  drivers: {
    id: 'drivers',
    label: 'Drivers',
    filterSummaryLabel: 'driver',
    taskType: 'DRIVER',
    icon: ICONS.DRIVER,
  },
  enablers: {
    id: 'enablers',
    label: 'Enablers',
    filterSummaryLabel: 'enabler',
    taskType: 'ENABLER',
    icon: ICONS.ENABLER,
  },
  initiatives: {
    id: 'initiatives',
    label: 'Initiatives',
    filterSummaryLabel: 'initiative',
    taskType: 'INITIATIVE',
    icon: ICONS.INITIATIVE,
  },
  map: {
    id: 'map',
    label: 'Map',
    taskType: null,
    icon: ICONS.MAP,
  },
  charts: {
    id: 'charts',
    label: 'Charts',
    taskType: null,
    icon: ICONS.CHARTS,
  },
};

export const DEFAULT_TAB = TABS.all;
