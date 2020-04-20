/* eslint-disable no-param-reassign */
import * as TYPES from '../fields/Type';
import { multiplierForLevel } from '../fields/ContributesTo';

export const prioritise = (tasks) => {
  let highestPriority = 0;
  let highestDriverPriority = 0;

  tasks
    .filter((task) => task.type === TYPES.DRIVER)
    .forEach((driver) => {
      highestDriverPriority =
        driver.priority > highestDriverPriority ? driver.priority : highestDriverPriority;
    });

  tasks
    .filter((task) => task.type === TYPES.ENABLER)
    .forEach((enabler) => {
      enabler.priority = 0;
      enabler.contributesTo.forEach((contribution) => {
        const driverPriority = tasks.find((task) => task.id === contribution.id).priority;
        enabler.priority +=
          (highestDriverPriority + 1 - driverPriority) * multiplierForLevel(contribution.level);
      });
      highestPriority = enabler.priority > highestPriority ? enabler.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type === TYPES.INITIATIVE)
    .forEach((initiative) => {
      initiative.priority = 0;
      initiative.contributesTo.forEach((contribution) => {
        const enablerPriority = tasks.find((task) => task.id === contribution.id).priority;
        initiative.priority += enablerPriority * multiplierForLevel(contribution.level);
      });
      highestPriority =
        initiative.priority > highestPriority ? initiative.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type !== TYPES.DRIVER)
    .forEach((task) => {
      task.priority = highestPriority + 1 - task.priority;
    });
};
