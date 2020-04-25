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
import { formatDateRange } from '../../util/Dates';

export const TASK_FILTER_CONTROL_IDS = {
  CREATED_DATE: 'CREATED_DATE',
  CREATED_BY: 'CREATED_BY',
  RUNNING: 'RUNNING',
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  VACANCIES: 'VACANCIES',
  TYPE: 'TYPE',
  SEARCH_FIELD: 'SEARCH_FIELD',
};

export const getControlsForType = (taskListfilterControls, currentTaskType) => {
  return taskListfilterControls.filter(
    (filterControl) =>
      typeof filterControl.forTaskTypes === 'undefined' ||
      filterControl.forTaskTypes.includes(currentTaskType)
  );
};

export const isAFilterActive = (taskListfilterControls, currentTaskTypeId) => {
  const createdDateControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.CREATED_DATE
  );
  const createdByControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.CREATED_BY
  );
  const runningControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.RUNNING
  );
  const startDateControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.START_DATE
  );
  const endDateControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.END_DATE
  );
  const vacanciesControl = taskListfilterControls.find(
    (control) => control.id === TASK_FILTER_CONTROL_IDS.VACANCIES
  );

  return (
    createdDateControl.selectedId !== createdDateControl.defaultId ||
    createdByControl.selectedId !== createdByControl.defaultId ||
    (runningControl.selectedId !== runningControl.defaultId && currentTaskTypeId === INITIATIVE) ||
    (startDateControl.selectedId !== startDateControl.defaultId &&
      currentTaskTypeId === INITIATIVE) ||
    (endDateControl.selectedId !== endDateControl.defaultId && currentTaskTypeId === INITIATIVE) ||
    (vacanciesControl.selectedId !== vacanciesControl.defaultId && currentTaskTypeId === INITIATIVE)
  );
};

export const filterSummary = (control) => {
  const selected = control.options.find((option) => option.id === control.selectedId);
  return `${control.label} ${
    selected.datePicker ? formatDateRange(selected.params) : selected.label
  }`;
};

export const allFiltersSummary = (activeFilters, currentTab, total) => {
  const singleTask = total === 1;
  const taskNoun = singleTask ? currentTab.filterSummaryLabel : `${currentTab.filterSummaryLabel}s`;
  const collective = activeFilters.length === 0 ? '' : singleTask ? ' is ' : ' are ';

  return activeFilters.reduce((summaryString, filter, index) => {
    let join = '';
    if (index < activeFilters.length - 2 && activeFilters.length > 2) {
      join = ', ';
    } else if (index < activeFilters.length - 1) {
      join = ' and ';
    }

    if (filter.id === TASK_FILTER_CONTROL_IDS.SEARCH_FIELD) {
      return `${summaryString} ${singleTask ? 'contains' : 'contain'} "${filter.text}"${join}`;
    }
    let summaryItem = filterSummary(filter);
    summaryItem = summaryItem.charAt(0).toLowerCase() + summaryItem.slice(1);

    return `${summaryString}${collective}${summaryItem}${join}`;
  }, `${total} ${taskNoun}`);
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
        return selectedFilter.execute(tasks, selectedFilter.params);
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
    id: TASK_FILTER_CONTROL_IDS.RUNNING,
    label: 'Running',
    type: FILTER_TYPES.SELECT,
    onFilterBar: true,
    ...createDateSelectFilterControl(null, true),
    forTaskTypes: [INITIATIVE],
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
