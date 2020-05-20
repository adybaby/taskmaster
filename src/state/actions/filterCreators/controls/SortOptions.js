import { TABS } from '../../../../constants/Constants';

const COSTS_SORT_ORDER = [
  { sortOrder: 1, name: 'No commercial cost' },
  { sortOrder: 2, name: 'Cheap' },
  { sortOrder: 3, name: 'Moderate' },
  { sortOrder: 4, name: 'Expensive' },
  { sortOrder: 5, name: 'Very Expensive' },
];

const TYPE_SORT_ORDER = {
  DRIVER: 1,
  ENABLER: 2,
  INITIATIVE: 3,
};

const sortOrderForCost = (cost) => COSTS_SORT_ORDER.find((c) => c.name === cost).sortOrder;
const sortOrderForType = (type) => TYPE_SORT_ORDER[type];

const createStringSorter = (field) => (tasks) =>
  [...tasks].sort((a, b) => a[field].localeCompare(b[field]));

const createIntegerSorter = (field) => (tasks) => [...tasks].sort((a, b) => a[field] - b[field]);

const createDateSorter = (dateField) => (tasks) =>
  [...tasks].sort((a, b) => {
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

const createCreatedBySorter = (users) => (tasks) =>
  [...tasks].sort((a, b) => {
    const userA = users.find((user) => user.id === a.createdBy);
    const userB = users.find((user) => user.id === b.createdBy);
    return `${userA.lastName}${userA.firstName}`.localeCompare(
      `${userB.lastName}${userB.firstName}`
    );
  });

const prioritySorter = (tasks) =>
  [...tasks].sort((a, b) => {
    if (a.type !== b.type) {
      return sortOrderForType(a.type) - sortOrderForType(b.type);
    }
    if (
      a.priority === b.priority &&
      typeof a.cost !== 'undefined' &&
      typeof b.cost !== 'undefined'
    ) {
      return sortOrderForCost(a.cost) - sortOrderForCost(b.cost);
    }
    return a.priority - b.priority;
  });

export const createSortOptions = (users) => [
  {
    id: 'SORT_CONTROL_ID',
    label: 'Priority (highest first)',
    execute: prioritySorter,
  },
  {
    id: 'PRIORITY_REVERSE',
    label: 'Priority (lowest first)',
    execute: (tasks) => prioritySorter(tasks).reverse(),
  },
  {
    id: 'CREATED_DATE',
    label: 'Created Date (earliest first)',
    execute: createDateSorter('createdDate'),
  },
  {
    id: 'CREATED_DATE_REVERSE',
    label: 'Created Date (latest first)',
    execute: (tasks) => createDateSorter('createdDate')(tasks).reverse(),
  },
  {
    id: 'AUTHOR',
    label: 'Author (surname A-Z)',
    execute: createCreatedBySorter(users),
  },
  {
    id: 'AUTHOR_REVERSE',
    label: 'Author (surname Z-A)',
    execute: (tasks) => createCreatedBySorter(users)(tasks).reverse(),
  },
  {
    id: 'START_DATE',
    label: 'Start Date (earliest first)',
    tabs: [TABS.initiatives.id],
    execute: createDateSorter('startDate'),
  },
  {
    id: 'START_DATE_REVERSE',
    label: 'Start Date (latest first)',
    tabs: [TABS.initiatives.id],
    execute: (tasks) => createDateSorter('startDate')(tasks).reverse(),
  },
  {
    id: 'END_DATE',
    label: 'End Date (earliest first)',
    tabs: [TABS.initiatives.id],
    execute: createDateSorter('endDate'),
  },
  {
    id: 'END_DATE_REVERSE',
    label: 'End Date (latest first)',
    tabs: [TABS.initiatives.id],
    execute: (tasks) => createDateSorter('endDate')(tasks).reverse(),
  },
  {
    id: 'TITLE',
    label: 'Title (A-Z)',
    execute: createStringSorter('title'),
  },
  {
    id: 'TITLE_REVERSE',
    label: 'Title (Z-A)',
    execute: (tasks) => createStringSorter('title')(tasks).reverse(),
  },
  {
    id: 'ID',
    label: 'ID (ascending)',
    execute: createIntegerSorter('id'),
  },
  {
    id: 'ID_REVERSE',
    label: 'ID (descending)',
    execute: (tasks) => createIntegerSorter('id')(tasks).reverse(),
  },
];
