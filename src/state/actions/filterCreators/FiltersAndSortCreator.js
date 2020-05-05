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
    label: 'Created',
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions('createdDate', false),
  }),
  new SelectFilter({
    id: FILTER_IDS.CREATED_BY,
    label: 'Created by',
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createCreatedByFilterOptions(users, currentUser),
  }),
  new SelectFilter({
    id: FILTER_IDS.RUNNING,
    label: 'Running',
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions(null, true),
  }),
  new SelectFilter({
    id: FILTER_IDS.START_DATE,
    label: 'Starting',
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions('startDate', true),
  }),
  new SelectFilter({
    id: FILTER_IDS.END_DATE,
    label: 'Ending',
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createDateFilterOptions('endDate', true),
  }),
  new SelectFilter({
    id: FILTER_IDS.VACANCIES,
    label: 'Requiring',
    tabs: [TABS.initiatives.id],
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createVacancyFilterOptions(tasks, currentUser),
  }),
  new SelectFilter({
    id: FILTER_IDS.CHART_RANGE,
    label: 'Dates: ',
    tabs: [TABS.charts.id],
    isOnFilterBar: true,
    isTaskFilter: false,
    options: createDateFilterOptions('startDate', true),
  }),
  new TextFilter({
    id: FILTER_IDS.SEARCH_FIELD,
    label: 'Search..',
    tabs: taskTabs,
    isOnFilterBar: false,
    isTaskFilter: true,
  }),
  new SelectFilter({
    id: FILTER_IDS.SORT,
    label: 'Sorted by',
    tabs: taskTabs,
    isOnFilterBar: true,
    isTaskFilter: true,
    options: createSortOptions(users),
  }),
];
