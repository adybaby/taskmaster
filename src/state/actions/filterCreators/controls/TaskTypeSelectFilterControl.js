import { TASK_TYPE } from '../../../../constants/Constants';

const DEFAULT_FILTER_ID = 'ALL';

const createExecute = (taskType) => (tasks) => tasks.filter((task) => task.type === taskType);

export const createTaskTypeSelectFilterControl = () => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'All',
    },
    {
      id: TASK_TYPE.DRIVER,
      label: 'Driver',
      execute: createExecute(TASK_TYPE.DRIVER),
    },
    {
      id: TASK_TYPE.ENABLER,
      label: 'Enabler',
      execute: createExecute(TASK_TYPE.ENABLER),
    },
    {
      id: TASK_TYPE.INITIATIVE,
      label: 'Initiative',
      execute: createExecute(TASK_TYPE.INITIATIVE),
    },
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
