import { createVacancyFilters } from './VacancyFilters';
import { createCreatedByFilters } from './CreatedByFilters';
import { createDateFilters } from './DateFilters';
import { createTaskTypeFilters, TASK_TYPE_FILTERS } from './TaskTypeFilters';
import { doesObjectIncludeStr } from '../../util/StringUtils';

const ALL_TASK_TYPE_FILTER_IDS = [
  TASK_TYPE_FILTERS.ALL.id,
  TASK_TYPE_FILTERS.DRIVER.id,
  TASK_TYPE_FILTERS.INITIATIVE.id,
  TASK_TYPE_FILTERS.ENABLER.id,
];

export const FILTER_IDS = {
  CREATED_DATE: 'CREATED_DATE',
  CREATED_BY: 'CREATED_BY',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  VACANCIES: 'VACANCIES',
  TYPE: 'TYPE',
  SEARCH_FIELD: 'SEARCH_FIELD',
};

/**
 FILTER CONTROLS:

 { type: 'SELECT', 
   id, 
   label, 
   filters:[ { 
     id, 
     label, 
     execute(tasks, (params)), 
     (dontPreCount), 
     (datePicker)
   }], 
   defaultFilterId,
   selectFilterId, 
   (params),
   (forTaskTypes), 
   (onFilterBar) 
 }

 { type: 'TEXT, 
   id, 
   label, 
   text, 
   execute(tasks, text) 
 }
 * */
export const createFilterControls = (tasks, users, currentUser) => [
  {
    id: FILTER_IDS.CREATED_DATE,
    label: 'Created Date',
    type: 'SELECT',
    ...createDateFilters('createdDate', false),
    forTaskTypes: ALL_TASK_TYPE_FILTER_IDS,
    onFilterBar: true,
  },
  {
    id: FILTER_IDS.CREATED_BY,
    label: 'Created By',
    type: 'SELECT',
    ...createCreatedByFilters(users),
    forTaskTypes: ALL_TASK_TYPE_FILTER_IDS,
    onFilterBar: true,
  },
  {
    id: FILTER_IDS.START_DATE,
    label: 'Start Date',
    type: 'SELECT',
    ...createDateFilters('startDate', true),
    forTaskTypes: [TASK_TYPE_FILTERS.INITIATIVE.id],
    onFilterBar: true,
  },
  {
    id: FILTER_IDS.END_DATE,
    label: 'End Date',
    type: 'SELECT',
    ...createDateFilters('endDate', true),
    forTaskTypes: [TASK_TYPE_FILTERS.INITIATIVE.id],
    onFilterBar: true,
  },
  {
    id: FILTER_IDS.VACANCIES,
    label: 'Vacancies',
    type: 'SELECT',
    ...createVacancyFilters(tasks, currentUser),
    forTaskTypes: [TASK_TYPE_FILTERS.INITIATIVE.id],
    onFilterBar: true,
  },
  {
    id: FILTER_IDS.TYPE,
    label: 'Type',
    type: 'SELECT',
    forTaskTypes: ALL_TASK_TYPE_FILTER_IDS,
    ...createTaskTypeFilters(),
  },
  {
    id: FILTER_IDS.SEARCH_FIELD,
    label: 'Search..',
    type: 'TEXT',
    text: '',
    forTaskTypes: ALL_TASK_TYPE_FILTER_IDS,
    execute: (tasks_, text) => tasks_.filter(doesObjectIncludeStr(text)),
  },
];
