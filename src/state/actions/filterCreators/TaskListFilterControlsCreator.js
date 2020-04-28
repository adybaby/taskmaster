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

import {
  TASK_TYPE,
  FILTER_TYPES,
  TASK_LIST_FILTER_CONTROL_IDS,
} from '../../../constants/Constants';
import { createVacancySelectFilterControl } from './controls/VacancySelectFilterControl';
import { createCreatedBySelectFilterControl } from './controls/CreatedByFilterControl';
import { createDateSelectFilterControl } from './controls/DateSelectFilterControl';
import { createTaskTypeSelectFilterControl } from './controls/TaskTypeSelectFilterControl';

export const createTaskFilterControls = (tasks, users, currentUser) => [
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.CREATED_DATE,
    label: 'Created',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('createdDate', false),
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.CREATED_BY,
    label: 'Created by',
    type: FILTER_TYPES.SELECT,
    ...createCreatedBySelectFilterControl(users, currentUser),
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.RUNNING,
    label: 'Running',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl(null, true),
    forTaskTypes: [TASK_TYPE.INITIATIVE],
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.START_DATE,
    label: 'Starting',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('startDate', true),
    forTaskTypes: [TASK_TYPE.INITIATIVE],
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.END_DATE,
    label: 'Ending',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl('endDate', true),
    forTaskTypes: [TASK_TYPE.INITIATIVE],
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.VACANCIES,
    label: 'Requiring',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createVacancySelectFilterControl(tasks, currentUser),
    forTaskTypes: [TASK_TYPE.INITIATIVE],
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.TYPE,
    label: 'Type',
    type: FILTER_TYPES.SELECT,
    ...createTaskTypeSelectFilterControl(),
  },
  {
    id: TASK_LIST_FILTER_CONTROL_IDS.SEARCH_FIELD,
    label: 'Search..',
    type: FILTER_TYPES.TEXT,
    text: '',
  },
];
