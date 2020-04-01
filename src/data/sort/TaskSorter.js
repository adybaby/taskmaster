import { sortOrderForType } from '../fields/ContributesTo';
import { sortOrderForCost } from '../fields/Cost';
import * as TYPES from '../fields/Type';

export const OPTIONS = {
  PRIORITY: 'Priority',
  LATEST: 'Creation Date',
  AUTHOR: 'Author',
  START_DATE: 'Start Date',
};

export const DEFAULT = OPTIONS.PRIORITY;

export const sortTasks = (tasks, sortOrder) => {
  switch (sortOrder) {
    case OPTIONS.LATEST: {
      return tasks.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    }

    case OPTIONS.PRIORITY: {
      return tasks.sort((a, b) => {
        if (a.type !== b.type) {
          return sortOrderForType(a.type) - sortOrderForType(b.type);
        }
        if (
          a.priority === b.priority &&
          a.type === TYPES.INITIATIVE &&
          b.type === TYPES.INITIATIVE
        ) {
          return sortOrderForCost(a.cost) - sortOrderForCost(b.cost);
        }
        return a.priority - b.priority;
      });
    }

    case OPTIONS.START_DATE: {
      return tasks.sort((a, b) => {
        if (typeof a.startDate === 'undefined') {
          if (typeof b.startDate === 'undefined') {
            return 0;
          }
          return 1;
        }
        if (typeof b.startDate === 'undefined') {
          return -1;
        }
        return new Date(a.startDate) - new Date(b.startDate);
      });
    }

    case OPTIONS.AUTHOR: {
      return tasks.sort((a, b) => a.createdBy.localeCompare(b.createdBy));
    }

    default:
      return tasks;
  }
};
