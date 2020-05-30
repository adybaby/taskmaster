import { createSelector } from 'reselect';
import { DEFAULT_TAB } from '../../constants/Constants';
import { getUserSelectedTaskFilters } from './FilterSelector';

const getTasks = (state) => state.tasks;
const getCurrentTab = (state) => state.currentTab;
const getFilterParams = (state) => state.filterParams;

export const getVisibleTasks = createSelector(
  [getTasks, getCurrentTab, getUserSelectedTaskFilters, getFilterParams],
  (tasks, currentTab, filters, filterParams) => {
    let filteredTasks = filters.reduce((currentFilteredTasks, filter) => {
      return filter.execute(currentFilteredTasks, filterParams[filter.id]);
    }, tasks);
    if (currentTab.taskType !== null && currentTab !== DEFAULT_TAB) {
      filteredTasks = filteredTasks.filter((task) => task.type === currentTab.taskType);
    }
    return filteredTasks;
  }
);
