/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { TABS } from '../../constants/common/Tabs';
import { TASK_LIST_FILTER_CONTROL_IDS } from '../../constants/Constants';

const getTaskListFilterControls = (state) => state.taskListfilterControls;
const getChartFilterControls = (state) => state.taskListfilterControls;
const getCurrentTab = (state) => state.currentTab;

const FILTER_BAR_CONTROLS = [
  TASK_LIST_FILTER_CONTROL_IDS.CREATED_DATE,
  TASK_LIST_FILTER_CONTROL_IDS.CREATED_BY,
  TASK_LIST_FILTER_CONTROL_IDS.RUNNING,
  TASK_LIST_FILTER_CONTROL_IDS.START_DATE,
  TASK_LIST_FILTER_CONTROL_IDS.END_DATE,
  TASK_LIST_FILTER_CONTROL_IDS.VACANCIES,
];

export const getFilterBarControls = createSelector(
  [getCurrentTab, getTaskListFilterControls, getChartFilterControls],
  (currentTab, taskFilterControls, chartFilterControls) => {
    switch (currentTab) {
      case TABS.all:
      case TABS.drivers:
      case TABS.enablers:
      case TABS.initiatives:
        return FILTER_BAR_CONTROLS.map((id) =>
          taskFilterControls.find((fc) => fc.id === id)
        ).filter(
          (filterControl) =>
            typeof filterControl.forTaskTypes === 'undefined' ||
            filterControl.forTaskTypes.includes(currentTab.taskType)
        );
      case TABS.charts:
        return chartFilterControls;
      default:
        return [];
    }
  }
);

export const getActiveFilterBarControls = createSelector(
  [getFilterBarControls],
  (filterBarControls) =>
    filterBarControls.filter(
      (filterControl) => filterControl.selectedId !== filterControl.defaultId
    )
);

export const getAllActiveTaskFilters = createSelector(
  [getTaskListFilterControls, getActiveFilterBarControls],
  (filterControls, activeFilterControls) => {
    return [
      ...activeFilterControls,
      ...filterControls.filter(
        (filterControl) =>
          (filterControl.id === TASK_LIST_FILTER_CONTROL_IDS.SEARCH_FIELD &&
            filterControl.text !== '') ||
          filterControl.id === TASK_LIST_FILTER_CONTROL_IDS.TYPE
      ),
    ];
  }
);
