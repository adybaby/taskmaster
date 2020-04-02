/**
 FILTER CONTROLS:

 { type: 'SELECT', 
   id, 
   label, 
   options:[ { 
     id, 
     label, 
     execute(tasks, (params)), 
     (dontPreCount), 
     (datePicker)
   }], 
   defaultId,
   selectedId, 
   (params),
   (forTaskTypes), 
   (onFilterBar) ,
   execute (tasks, filterControl, currentTaskType)
 }

 { type: 'TEXT, 
   id, 
   label, 
   text, 
   execute (tasks, filterControl, currentTaskType)
 }
 * */

import { createVacancyFilters } from './VacancyFilters';
import { createCreatedByFilters } from './CreatedByFilters';
import { createDateFilters } from './DateFilters';
import { createTaskTypeFilters } from './TaskTypeFilters';
import { doesObjectIncludeStr } from '../../util/StringUtils';
import { INITIATIVE } from '../fields/Type';

const FILTER_TYPES = {
  TEXT: 'TEXT',
  SELECT: 'SELECT',
};

export const FILTER_IDS = {
  CREATED_DATE: 'CREATED_DATE',
  CREATED_BY: 'CREATED_BY',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  VACANCIES: 'VACANCIES',
  TYPE: 'TYPE',
  SEARCH_FIELD: 'SEARCH_FIELD',
};

export const execute = (tasks, filterControl, currentTaskType) => {
  switch (filterControl.type) {
    case FILTER_TYPES.SELECT: {
      if (
        typeof filterControl.selectedId !== 'undefined' &&
        filterControl.selectedId !== filterControl.defaultId &&
        (typeof filterControl.forTaskTypes === 'undefined' ||
          typeof currentTaskType === 'undefined' ||
          filterControl.forTaskTypes.includes(currentTaskType))
      ) {
        const selectedFilter = filterControl.options.find(
          (filter) => filter.id === filterControl.selectedId
        );
        return selectedFilter.execute(tasks, filterControl.params);
      }
      break;
    }
    case FILTER_TYPES.TEXT: {
      if (filterControl.text !== '') {
        return tasks.filter(doesObjectIncludeStr(filterControl.text));
      }
      break;
    }
    default: {
      throw new Error(
        `filterControl type: ${filterControl.type} does not match any know filter types`
      );
    }
  }
  return tasks;
};

export const createFilterControls = (tasks, users, currentUser) => [
  {
    id: FILTER_IDS.CREATED_DATE,
    label: 'Created',
    type: FILTER_TYPES.SELECT,
    ...createDateFilters('createdDate', false),
    onFilterBar: true,
    execute,
  },
  {
    id: FILTER_IDS.CREATED_BY,
    label: 'Created by',
    type: FILTER_TYPES.SELECT,
    ...createCreatedByFilters(users),
    onFilterBar: true,
    execute,
  },
  {
    id: FILTER_IDS.START_DATE,
    label: 'Starting',
    type: FILTER_TYPES.SELECT,
    ...createDateFilters('startDate', true),
    forTaskTypes: [INITIATIVE],
    onFilterBar: true,
    execute,
  },
  {
    id: FILTER_IDS.END_DATE,
    label: 'Ending',
    type: FILTER_TYPES.SELECT,
    ...createDateFilters('endDate', true),
    forTaskTypes: [INITIATIVE],
    onFilterBar: true,
    execute,
  },
  {
    id: FILTER_IDS.VACANCIES,
    label: 'Requiring',
    type: FILTER_TYPES.SELECT,
    ...createVacancyFilters(tasks, currentUser),
    forTaskTypes: [INITIATIVE],
    onFilterBar: true,
    execute,
  },
  {
    id: FILTER_IDS.TYPE,
    label: 'Type',
    type: FILTER_TYPES.SELECT,
    ...createTaskTypeFilters(),
    execute,
  },
  {
    id: FILTER_IDS.SEARCH_FIELD,
    label: 'Search..',
    type: FILTER_TYPES.TEXT,
    text: '',
    execute,
  },
];
