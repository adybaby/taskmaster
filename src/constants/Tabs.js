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

export const DEFAULT = TABS.ALL.ID;

export default TABS;
