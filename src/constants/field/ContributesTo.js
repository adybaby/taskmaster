import { TASK_TYPE } from './TaskType';

const CONTRIBUTIONS = {
  MI: { multiplier: 11, displayName: 'Partial Contributor' },
  DR: { multiplier: 12, displayName: 'Derisking Contributor' },
  MA: { multiplier: 15, displayName: 'Major Contributor' },
};

const TYPE_PRIORITY = {
  [TASK_TYPE.DRIVER]: 1,
  [TASK_TYPE.ENABLER]: 2,
  [TASK_TYPE.INITIATIVE]: 3,
};

export const CONTRIBUTES_TO = {
  sortOrderForType: (type) => TYPE_PRIORITY[type],
  displayNameForLevel: (level) => CONTRIBUTIONS[level].displayName,
  multiplierForLevel: (level) => CONTRIBUTIONS[level].multiplier,
};
