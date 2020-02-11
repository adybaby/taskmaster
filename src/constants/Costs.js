const COSTS = {
  N: { sortOrder: 1, displayName: 'No commercial cost' },
  C: { sortOrder: 2, displayName: 'Cheap' },
  M: { sortOrder: 3, displayName: 'Moderate' },
  E: { sortOrder: 4, displayName: 'Expensive' },
  V: { sortOrder: 5, displayName: 'Very Expensive' }
};

export const displayNameForCost = cost => COSTS[cost].displayName;
export const sortOrderForCost = cost => COSTS[cost].sortOrder;
