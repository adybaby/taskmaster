import { createSelector } from 'reselect';
import { getAllActiveFilters } from './FilterSelector';
import { DEFAULT_TAB } from '../../constants/Constants';

const getTasks = (state) => state.tasks;
const getCurrentTab = (state) => state.currentTab;

export const getVisibleTasks = createSelector(
  [getTasks, getCurrentTab, getAllActiveFilters],
  (tasks, currentTab, activeFilters) => {
    let filteredTasks = activeFilters.reduce(
      (currentFilteredTasks, filter) =>
        filter.isTaskFilter
          ? filter.execute(currentFilteredTasks, currentTab)
          : currentFilteredTasks,
      tasks
    );
    if (currentTab.taskType !== null && currentTab !== DEFAULT_TAB) {
      filteredTasks = filteredTasks.filter((task) => task.type === currentTab.taskType);
    }
    return filteredTasks;
  }
);
