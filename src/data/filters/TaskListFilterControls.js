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
   execute (tasks, filterControl, currentTaskType)
 }

 { type: 'TEXT, 
   id, 
   label, 
   text, 
   execute (tasks, filterControl, currentTaskType)
 }
 * */

import { createVacancySelectFilterControl } from './controls/VacancySelectFilterControl';
import { createCreatedBySelectFilterControl } from './controls/CreatedByFilterControl';
import { createDateSelectFilterControl } from './controls/DateSelectFilterControl';
import { createTaskTypeSelectFilterControl } from './controls/TaskTypeSelectFilterControl';
import { doesObjectIncludeStr } from '../../util/StringUtils';
import { INITIATIVE } from '../fields/Type';
import { FILTER_TYPES } from './FilterTypes';

export const TASK_FILTER_CONTROL_IDS = {
  CREATED_DATE: 'CREATED_DATE',
  CREATED_BY: 'CREATED_BY',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  VACANCIES: 'VACANCIES',
  TYPE: 'TYPE',
  SEARCH_FIELD: 'SEARCH_FIELD',
};

export const getControlsForType = (taskListfilterControls, currentTaskType, filterBarVisible) => {
  return taskListfilterControls.filter(
    (filterControl) =>
      (typeof filterControl.forTaskTypes === 'undefined' ||
        filterControl.forTaskTypes.includes(currentTaskType)) &&
      ((filterBarVisible && filterControl.onFilterBar) || !filterControl.onFilterBar)
  );
};

export const executeFilterControl = (tasks, filterControl) => {
  switch (filterControl.type) {
    case FILTER_TYPES.SELECT: {
      if (
        typeof filterControl.selectedId !== 'undefined' &&
        filterControl.selectedId !== filterControl.defaultId
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
        `filterControl type: ${filterControl.type} does not match any known filter types`
      );
    }
  }
  return tasks;
};

export const executeFilterControls = (tasks, taskListfilterControls, filterBarVisible) => {
  let filteredTasks = tasks;
  getControlsForType(
    taskListfilterControls,
    taskListfilterControls.find(
      (filterControl) => filterControl.id === TASK_FILTER_CONTROL_IDS.TYPE
    ).selectedId,
    filterBarVisible
  ).forEach((filterControl) => {
    filteredTasks = executeFilterControl(filteredTasks, filterControl);
  });
  return filteredTasks;
};

export const createTaskFilterControls = (tasks, users, currentUser) => [
  {
    id: TASK_FILTER_CONTROL_IDS.CREATED_DATE,
    label: 'Created',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('createdDate', false),
  },
  {
    id: TASK_FILTER_CONTROL_IDS.CREATED_BY,
    label: 'Created by',
    type: FILTER_TYPES.SELECT,
    ...createCreatedBySelectFilterControl(users),
  },
  {
    id: TASK_FILTER_CONTROL_IDS.START_DATE,
    label: 'Starting',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('startDate', true),
    forTaskTypes: [INITIATIVE],
  },
  {
    id: TASK_FILTER_CONTROL_IDS.END_DATE,
    label: 'Ending',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('endDate', true),
    forTaskTypes: [INITIATIVE],
  },
  {
    id: TASK_FILTER_CONTROL_IDS.VACANCIES,
    label: 'Requiring',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createVacancySelectFilterControl(tasks, currentUser),
    forTaskTypes: [INITIATIVE],
  },
  {
    id: TASK_FILTER_CONTROL_IDS.TYPE,
    label: 'Type',
    type: FILTER_TYPES.SELECT,
    ...createTaskTypeSelectFilterControl(),
  },
  {
    id: TASK_FILTER_CONTROL_IDS.SEARCH_FIELD,
    label: 'Search..',
    type: FILTER_TYPES.TEXT,
    text: '',
  },
];
