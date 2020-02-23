import * as TASK_TYPES from './TaskTypes';
import * as URLS from './Urls';

export const TABS = {
  ALL: {
    ID: 'ALL',
    LABEL: 'All',
    URL: URLS.ALL,
    TASKTYPE: TASK_TYPES.ALL
  },
  DRIVERS: {
    ID: 'DRIVERS',
    LABEL: 'Drivers',
    URL: URLS.DRIVERS,
    TASKTYPE: TASK_TYPES.DRIVER
  },
  ENABLERS: {
    ID: 'ENABLERS',
    LABEL: 'Enablers',
    URL: URLS.ENABLERS,
    TASKTYPE: TASK_TYPES.ENABLER
  },
  INITIATIVES: {
    ID: 'INITIATIVES',
    LABEL: 'Initiatives',
    URL: URLS.INITIATIVES,
    TASKTYPE: TASK_TYPES.INITIATIVE
  },
  MAP: {
    ID: 'MAP',
    LABEL: 'Map',
    URL: URLS.MAP,
    TASKTYPE: null
  },
  CHARTS: {
    ID: 'CHARTS',
    LABEL: 'Charts',
    URL: URLS.CHARTS,
    TASKTYPE: null
  }
};

export const getTabForUrl = url =>
  typeof url !== 'undefined'
    ? Object.entries(TABS).filter(_tab => _tab[1].URL === url)[0][1]
    : TABS.ALL;

export const DEFAULT = TABS.ALL;

export default TABS;
