import * as TYPES from './TaskTypes';

const CONTRIBUTIONS = {
  MI: { multiplier: 11, displayName: 'Partial Contributor' },
  DR: { multiplier: 12, displayName: 'Derisking Contributor' },
  MA: { multiplier: 15, displayName: 'Major Contributor' }
};

const TYPE_PRIORITY = {
  [TYPES.DRIVER]: 1,
  [TYPES.ENABLER]: 2,
  [TYPES.INITIATIVE]: 3
};

export const sortOrderForType = type => TYPE_PRIORITY[type];
export const displayNameForLevel = level => CONTRIBUTIONS[level].displayName;
export const multiplierForLevel = level => CONTRIBUTIONS[level].multiplier;
