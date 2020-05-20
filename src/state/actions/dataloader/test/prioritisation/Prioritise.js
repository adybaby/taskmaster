/* eslint-disable no-param-reassign */
const CONTRIBUTION_MULTIPLIERS = {
  Minor: { multiplier: 11, displayName: 'Partial Contributor' },
  DeRisking: { multiplier: 12, displayName: 'Derisking Contributor' },
  Major: { multiplier: 15, displayName: 'Major Contributor' },
};

const multiplierForLevel = (level) => CONTRIBUTION_MULTIPLIERS[level].multiplier;

export const prioritise = (tasks) => {
  let highestPriority = 0;
  let highestDriverPriority = 0;

  tasks
    .filter((task) => task.type === 'DRIVER')
    .forEach((driver) => {
      highestDriverPriority =
        driver.priority > highestDriverPriority ? driver.priority : highestDriverPriority;
    });

  tasks
    .filter((task) => task.type === 'ENABLER')
    .forEach((enabler) => {
      enabler.priority = 0;
      enabler.contributesTo.forEach((contributesTo) => {
        const driverPriority = tasks.find((task) => task.id === contributesTo.id).priority;
        enabler.priority +=
          (highestDriverPriority + 1 - driverPriority) *
          multiplierForLevel(contributesTo.contribution);
      });
      highestPriority = enabler.priority > highestPriority ? enabler.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type === 'INITIATIVE')
    .forEach((initiative) => {
      initiative.priority = 0;
      initiative.contributesTo.forEach((contributesTo) => {
        const enablerPriority = tasks.find((task) => task.id === contributesTo.id).priority;
        initiative.priority += enablerPriority * multiplierForLevel(contributesTo.contribution);
      });
      highestPriority =
        initiative.priority > highestPriority ? initiative.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type !== 'DRIVER')
    .forEach((task) => {
      task.priority = highestPriority + 1 - task.priority;
    });
};
