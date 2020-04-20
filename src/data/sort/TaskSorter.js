import { sortOrderForType } from '../fields/ContributesTo';
import { sortOrderForCost } from '../fields/Cost';
import { INITIATIVE } from '../fields/Type';

export const SORT_CONTROL_ID = 'SORT_CONTROL_ID';
export const DEFAULT_SORTER_ID = 'PRIORITY';

const createReversibleSorter = (executor, reverseOrder) =>
  reverseOrder ? (tasks, users) => executor(tasks, users).reverse() : executor;

const createStringSorter = (field) => (tasks) =>
  tasks.sort((a, b) => a[field].localeCompare(b[field]));

const createIntegerSorter = (field) => (tasks) => tasks.sort((a, b) => a[field] - b[field]);

const createDateSorter = (dateField) => (tasks) =>
  tasks.sort((a, b) => {
    if (typeof a[dateField] === 'undefined') {
      if (typeof b[dateField] === 'undefined') {
        return 0;
      }
      return 1;
    }
    if (typeof b[dateField] === 'undefined') {
      return -1;
    }
    return a[dateField] - b[dateField];
  });

const prioritySorter = (tasks) =>
  tasks.sort((a, b) => {
    if (a.type !== b.type) {
      return sortOrderForType(a.type) - sortOrderForType(b.type);
    }
    if (a.priority === b.priority && a.type === INITIATIVE && b.type === INITIATIVE) {
      return sortOrderForCost(a.cost) - sortOrderForCost(b.cost);
    }
    return a.priority - b.priority;
  });

const createdBySorter = (tasks, users) =>
  tasks.sort((a, b) => {
    const userA = users.find((user) => user.id === a.createdBy);
    const userB = users.find((user) => user.id === b.createdBy);
    return `${userA.lastName}${userA.firstName}`.localeCompare(
      `${userB.lastName}${userB.firstName}`
    );
  });

const SORTERS = [
  {
    id: DEFAULT_SORTER_ID,
    label: 'priority (highest first)',
    execute: createReversibleSorter(prioritySorter),
  },
  {
    id: 'PRIORITY_REVERSE',
    label: 'priority (lowest first)',
    execute: createReversibleSorter(prioritySorter, true),
  },
  {
    id: 'CREATED_DATE',
    label: 'created date (earliest first)',
    execute: createReversibleSorter(createDateSorter('createdDate')),
  },
  {
    id: 'CREATED_DATE_REVERSE',
    label: 'created date (latest first)',
    execute: createReversibleSorter(createDateSorter('createdDate'), true),
  },
  {
    id: 'AUTHOR',
    label: 'author (surname A-Z)',
    execute: createReversibleSorter(createdBySorter),
  },
  {
    id: 'AUTHOR_REVERSE',
    label: 'author (surname Z-A)',
    execute: createReversibleSorter(createdBySorter, true),
  },
  {
    id: 'START_DATE',
    label: 'start date (earliest first)',
    forTaskTypes: [INITIATIVE],
    execute: createReversibleSorter(createDateSorter('startDate')),
  },
  {
    id: 'START_DATE_REVERSE',
    label: 'start date (latest first)',
    forTaskTypes: [INITIATIVE],
    execute: createReversibleSorter(createDateSorter('startDate'), true),
  },
  {
    id: 'END_DATE',
    label: 'end date (earliest first)',
    forTaskTypes: [INITIATIVE],
    execute: createReversibleSorter(createDateSorter('endDate')),
  },
  {
    id: 'END_DATE_REVERSE',
    label: 'end date (latest first)',
    forTaskTypes: [INITIATIVE],
    execute: createReversibleSorter(createDateSorter('endDate'), true),
  },
  {
    id: 'TITLE',
    label: 'title (A-Z)',
    execute: createReversibleSorter(createStringSorter('title')),
  },
  {
    id: 'TITLE_REVERSE',
    label: 'title (Z-A)',
    execute: createReversibleSorter(createStringSorter('title'), true),
  },
  {
    id: 'ID',
    label: 'ID (ascending)',
    execute: createReversibleSorter(createIntegerSorter('id')),
  },
  {
    id: 'ID_REVERSE',
    label: 'ID (descending)',
    execute: createReversibleSorter(createIntegerSorter('id'), true),
  },
];

export const createSortControl = () => ({
  id: SORT_CONTROL_ID,
  label: 'Sorted by',
  defaultId: DEFAULT_SORTER_ID,
  dontHighlight: true,
  type: 'SORT_SELECT',
  options: SORTERS,
});

export const sortTasks = (tasks, users, sorterId) =>
  SORTERS.find((sorter) => sorter.id === sorterId).execute(tasks, users);
