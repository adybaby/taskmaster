import { createSelector } from 'reselect';
import { DEFAULT_TAB } from '../../constants/Constants';
import { getUserSelectedTaskFilters } from './FilterSelector';

const getCurrentTab = (state) => state.currentTab;
const getFilterParams = (state) => state.filterParams;
const getTaskSummaries = (state) => state.taskSummaries;
const getAllFilters = (state) => state.filters;

export const getVisibleTaskSummaries = createSelector(
  [getTaskSummaries, getCurrentTab, getUserSelectedTaskFilters, getFilterParams, getAllFilters],
  (taskSummaries, currentTab, filters, filterParams, allFilters) => {
    const applicableFilters = [...filters];
    if (!filters.find((f) => f.id === 'sort')) {
      applicableFilters.push(allFilters.sort);
    }

    let filteredTaskSummaries = applicableFilters.reduce((currentFilteredTasks, filter) => {
      const param = filterParams.find((filterParam) => filterParam.id === filter.id);
      return filter.execute(
        currentFilteredTasks,
        param == null ? filter.defaultParams : param.params
      );
    }, taskSummaries);

    if (currentTab.taskType !== null && currentTab !== DEFAULT_TAB) {
      filteredTaskSummaries = filteredTaskSummaries.filter(
        (task) => task.type === currentTab.taskType
      );
    }
    return filteredTaskSummaries;
  }
);
