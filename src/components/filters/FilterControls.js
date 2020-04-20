import React from 'react';
import { TaskSelectFilter } from './TaskSelectFilter';
import { ChartSelectFilter } from './ChartSelectFilter';
import { SortControl } from './SortControl';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';

const taskListfilterIds = [
  TASK_FILTER_CONTROL_IDS.CREATED_DATE,
  TASK_FILTER_CONTROL_IDS.CREATED_BY,
  TASK_FILTER_CONTROL_IDS.START_DATE,
  TASK_FILTER_CONTROL_IDS.END_DATE,
  TASK_FILTER_CONTROL_IDS.VACANCIES,
];

export const getCurrentFilters = (
  currentTab,
  tabs,
  taskListFilterControls,
  chartFilterControls,
  handleFilterSelected
) => {
  const taskListTabs = [tabs.all, tabs.drivers, tabs.enablers, tabs.initiatives];
  const currentType = taskListFilterControls.find(
    (filterControl) => filterControl.id === TASK_FILTER_CONTROL_IDS.TYPE
  ).selectedId;

  if (currentTab === tabs.charts)
    return (
      <ChartSelectFilter
        filterControl={chartFilterControls[0]}
        handleFilterSelected={handleFilterSelected}
      />
    );

  if (taskListTabs.includes(currentTab))
    return (
      <>
        {taskListfilterIds.map((id, index) => {
          const filterControl = taskListFilterControls.find((fc) => fc.id === id);
          return typeof filterControl.forTaskTypes === 'undefined' ||
            filterControl.forTaskTypes.includes(currentTab.taskType) ? (
            <TaskSelectFilter
              key={index}
              filterControl={taskListFilterControls.find((fc) => fc.id === id)}
            />
          ) : null;
        })}
        <SortControl currentTaskType={currentType} />
      </>
    );

  return 'Error: Cannot find any filter controls for filter bar';
};
