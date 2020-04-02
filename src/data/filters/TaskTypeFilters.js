import * as TASK_TYPES from '../fields/Type';

const DEFAULT_FILTER_ID = 'ALL';

const createExecuteFunction = (taskType) => (tasks) =>
  tasks.filter((task) => task.type === taskType);

export const createTaskTypeFilters = () => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'All',
    },
    {
      id: TASK_TYPES.DRIVER,
      label: 'Driver',
      execute: createExecuteFunction(TASK_TYPES.DRIVER),
    },
    {
      id: TASK_TYPES.ENABLER,
      label: 'Enabler',
      execute: createExecuteFunction(TASK_TYPES.ENABLER),
    },
    {
      id: TASK_TYPES.INITIATIVE,
      label: 'Initiative',
      execute: createExecuteFunction(TASK_TYPES.INITIATIVE),
    },
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
