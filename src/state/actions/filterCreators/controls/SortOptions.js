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
    if (a[dateField] == null) {
      if (b[dateField] == null) {
        return 0;
      }
      return 1;
    }
    if (b[dateField] == null) {
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
    if (a.priority === b.priority && a.cost != null && b.cost != null) {
      return sortOrderForCost(a.cost) - sortOrderForCost(b.cost);
    }
    return a.priority - b.priority;
  });

export const createSortOptions = (users) => [
  {
    id: 'sort_control_id',
    label: 'priority (highest first)',
    execute: prioritySorter,
  },
  {
    id: 'priority_reverse',
    label: 'priority (lowest first)',
    execute: (tasks) => prioritySorter(tasks).reverse(),
  },
  {
    id: 'created_date',
    label: 'created date (earliest first)',
    execute: createDateSorter('createdDate'),
  },
  {
    id: 'created_date_reverse',
    label: 'created date (latest first)',
    execute: (tasks) => createDateSorter('createdDate')(tasks).reverse(),
  },
  {
    id: 'author',
    label: 'author (surname A-Z)',
    execute: createCreatedBySorter(users),
  },
  {
    id: 'author_reverse',
    label: 'author (surname Z-A)',
    execute: (tasks) => createCreatedBySorter(users)(tasks).reverse(),
  },
  {
    id: 'start_date',
    label: 'start date (earliest first)',
    tabs: [TABS.initiatives.id],
    execute: createDateSorter('startDate'),
  },
  {
    id: 'start_date_reverse',
    label: 'start date (latest first)',
    tabs: [TABS.initiatives.id],
    execute: (tasks) => createDateSorter('startDate')(tasks).reverse(),
  },
  {
    id: 'end_date',
    label: 'end date (earliest first)',
    tabs: [TABS.initiatives.id],
    execute: createDateSorter('endDate'),
  },
  {
    id: 'end_date_reverse',
    label: 'end date (latest first)',
    tabs: [TABS.initiatives.id],
    execute: (tasks) => createDateSorter('endDate')(tasks).reverse(),
  },
  {
    id: 'title',
    label: 'title (A-Z)',
    execute: createStringSorter('title'),
  },
  {
    id: 'TITLE_REVERSE',
    label: 'title (Z-A)',
    execute: (tasks) => createStringSorter('title')(tasks).reverse(),
  },
  {
    id: 'id',
    label: 'ID (ascending)',
    execute: createIntegerSorter('id'),
  },
  {
    id: 'id_reverse',
    label: 'ID (descending)',
    execute: (tasks) => createIntegerSorter('id')(tasks).reverse(),
  },
];
