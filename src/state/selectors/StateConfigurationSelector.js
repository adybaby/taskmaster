import { createSelector } from 'reselect';
import { TABS, DEFAULT_TAB, DEFAULT_CHART } from '../../constants/Constants';
import { getAllActiveFilters } from './FilterSelector';

const getCurrentTab = (state) => state.currentTab;
const getFilterBarVisible = (state) => state.filterBarVisible;
const getSelectedChart = (state) => state.selectedChart;

export const getStateConfiguration = createSelector(
  [getAllActiveFilters, getFilterBarVisible, getSelectedChart, getCurrentTab],
  (filters, filterBarVisible, selectedChart, currentTab) => {
    const tabConfig = currentTab.id === DEFAULT_TAB.id ? null : currentTab.id;
    const fbvConfig = filterBarVisible || null;
    const scConfig =
      currentTab.id !== TABS.charts.id || selectedChart.id === DEFAULT_CHART.id
        ? null
        : selectedChart.id;
    const filtersConfig = filters.reduce((config, filter) => {
      const filterConfig = filter.getActiveFilterIdAndParamIds(currentTab);
      return filterConfig === null ? config : [...config, filterConfig];
    }, []);

    const config = {};
    if (tabConfig !== null) {
      config.currentTabId = tabConfig;
    }
    if (fbvConfig !== null) {
      config.filterBarVisible = fbvConfig;
    }
    if (scConfig !== null) {
      config.selectedChartId = scConfig;
    }
    if (filtersConfig.length > 0) {
      config.filters = filtersConfig;
    }
    return config;
  }
);
