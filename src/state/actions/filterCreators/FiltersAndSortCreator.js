import { TABS, FILTER_IDS } from '../../../constants/Constants';
import { createVacancyFilterOptions } from './controls/VacancyFilterOptions';
import { createCreatedByFilterOptions } from './controls/CreatedByFilterOptions';
import { createDateFilterOptions } from './controls/DateFilterOptions';
import { createSortOptions } from './controls/SortOptions';
import { SelectFilter } from './SelectFilter';
import { TextFilter } from './TextFilter';

const taskTabs = [TABS.all.id, TABS.drivers.id, TABS.enablers.id, TABS.initiatives.id];

export const createFilters = (tasks, users, currentUser) => [
  new SelectFilter({
    id: FILTER_IDS.CREATED_DATE,
    labels: {
      filter: 'Created',
      summaryPastSingular: 'was created',
      summaryPastPlural: 'were created',
    },
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    forPastTasks: true,
    options: createDateFilterOptions('createdDate', false),
  }),
  new SelectFilter({
    id: FILTER_IDS.CREATED_BY,
    labels: {
      filter: 'Created by',
      summaryPastSingular: 'was created by',
      summaryPastPlural: 'were created by',
    },
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    forPastTasks: true,
    options: createCreatedByFilterOptions(users, currentUser),
  }),
  new SelectFilter({
    id: FILTER_IDS.RUNNING,
    labels: {
      filter: 'Running',
      summarySingular: 'is running',
      summaryPlural: 'are running',
      summaryPastSingular: 'ran',
      summaryPastPlural: 'ran',
    },
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions(null, true),
  }),
  new SelectFilter({
    id: FILTER_IDS.START_DATE,
    labels: {
      filter: 'Starting',
      summarySingular: 'is starting',
      summaryPlural: 'are starting',
      summaryPastSingular: 'started',
      summaryPastPlural: 'started',
    },
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions('startDate', true),
  }),
  new SelectFilter({
    id: FILTER_IDS.END_DATE,
    labels: {
      filter: 'Ending',
      summarySingular: 'is ending',
      summaryPlural: 'are ending',
      summaryPastSingular: 'ended',
      summaryPastPlural: 'ended',
    },
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions('endDate', true),
  }),
  new SelectFilter({
    id: FILTER_IDS.VACANCIES,
    labels: {
      filter: 'Requires',
      summarySingular: 'requires',
      summaryPlural: 'require',
    },
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    forPastTasks: false,
    options: createVacancyFilterOptions(tasks, currentUser),
  }),
  new SelectFilter({
    id: FILTER_IDS.CHART_RANGE,
    labels: { filter: 'Date range:' },
    tabs: [TABS.charts.id],
    isOnFilterBar: true,
    isTaskFilter: false,
    options: createDateFilterOptions('startDate', true),
  }),
  new TextFilter({
    id: FILTER_IDS.SEARCH_FIELD,
    labels: {
      filter: 'Search..',
      summarySingular: 'contains the text',
      summaryPlural: 'contain the text',
    },
    tabs: taskTabs,
    isOnFilterBar: false,
    isTaskFilter: true,
    forPastTasks: false,
  }),
  new SelectFilter({
    id: FILTER_IDS.SORT,
    labels: { filter: 'Sorted by' },
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createSortOptions(users),
  }),
];
