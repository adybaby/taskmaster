import { createSelector } from 'reselect';
import { DEFAULT_TAB } from '../../constants/Constants';
import { getUserSelectedTaskFilters } from './FilterSelector';

const getCurrentTab = (state) => state.currentTab;
const getFilterParams = (state) => state.filterParams;
const getTaskSummaries = (state) => state.taskSummaries;

export const getVisibleTaskSummaries = createSelector(
  [getTaskSummaries, getCurrentTab, getUserSelectedTaskFilters, getFilterParams],
  (taskSummaries, currentTab, filters, filterParams) => {
    let filteredTaskSummaries = filters.reduce((currentFilteredTasks, filter) => {
      return filter.execute(currentFilteredTasks, filterParams[filter.id]);
    }, taskSummaries);
    if (currentTab.taskType !== null && currentTab !== DEFAULT_TAB) {
      filteredTaskSummaries = filteredTaskSummaries.filter(
        (task) => task.type === currentTab.taskType
      );
    }
    return filteredTaskSummaries;
  }
);
