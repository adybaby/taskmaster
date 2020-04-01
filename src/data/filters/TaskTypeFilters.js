import * as TASK_TYPES from '../fields/Type';

export const TASK_TYPE_FILTERS = {
  DRIVER: { id: TASK_TYPES.DRIVER, label: 'Driver' },
  ENABLER: { id: TASK_TYPES.ENABLER, label: 'Enabler' },
  INITIATIVE: { id: TASK_TYPES.INITIATIVE, label: 'Initiative' },
  ALL: { id: 'ALL', label: 'All' },
};

const DEFAULT_FILTER_ID = TASK_TYPE_FILTERS.ALL.id;

const createExecuteFunction = (taskType) => (tasks) =>
  tasks.filter((task) => task.type === taskType);

export const createTaskTypeFilters = () => ({
  filters: [
    {
      id: DEFAULT_FILTER_ID,
      label: TASK_TYPE_FILTERS.ALL.label,
    },
    {
      id: TASK_TYPE_FILTERS.DRIVER.id,
      label: TASK_TYPE_FILTERS.DRIVER.label,
      execute: createExecuteFunction(TASK_TYPE_FILTERS.DRIVER.id),
    },
    {
      id: TASK_TYPE_FILTERS.ENABLER.id,
      label: TASK_TYPE_FILTERS.ENABLER.label,
      execute: createExecuteFunction(TASK_TYPE_FILTERS.ENABLER.id),
    },
    {
      id: TASK_TYPE_FILTERS.INITIATIVE.id,
      label: TASK_TYPE_FILTERS.INITIATIVE.label,
      execute: createExecuteFunction(TASK_TYPE_FILTERS.INITIATIVE.id),
    },
  ],
  defaultFilterId: DEFAULT_FILTER_ID,
  selectedFilterId: DEFAULT_FILTER_ID,
});
