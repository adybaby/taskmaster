import * as TASK_TYPES from '../../fields/Type';

const DEFAULT_FILTER_ID = 'ALL';

const createExecute = (taskType) => (tasks) => tasks.filter((task) => task.type === taskType);

export const createTaskTypeSelectFilterControl = () => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'All',
    },
    {
      id: TASK_TYPES.DRIVER,
      label: 'Driver',
      execute: createExecute(TASK_TYPES.DRIVER),
    },
    {
      id: TASK_TYPES.ENABLER,
      label: 'Enabler',
      execute: createExecute(TASK_TYPES.ENABLER),
    },
    {
      id: TASK_TYPES.INITIATIVE,
      label: 'Initiative',
      execute: createExecute(TASK_TYPES.INITIATIVE),
    },
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
