const COSTS_DATA = {
  N: { id: 'N', sortOrder: 1, displayName: 'No commercial cost' },
  C: { id: 'C', sortOrder: 2, displayName: 'Cheap' },
  M: { id: 'M', sortOrder: 3, displayName: 'Moderate' },
  E: { id: 'E', sortOrder: 4, displayName: 'Expensive' },
  V: { id: 'V', sortOrder: 5, displayName: 'Very Expensive' },
};

export const COST = {
  displayNameForCost: (cost) => COSTS_DATA[cost].displayName,
  codeForDisplayName: (name) =>
    Object.values(COSTS_DATA).find((cost) => cost.displayName === name).id,
  sortOrderForCost: (cost) => COSTS_DATA[cost].sortOrder,
};
