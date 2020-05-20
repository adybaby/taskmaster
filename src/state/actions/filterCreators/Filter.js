import { FILTER_IDS } from '../../../constants/Constants';

export class Filter {
  id;

  labels;

  tabs;

  isOnFilterBar;

  params;

  isTaskFilter;

  pluralizeOptionLabels;

  constructor({ id, labels, tabs, isOnFilterBar, isTaskFilter, pluralizeOptionLabels, params }) {
    if (typeof id === 'undefined' || id === null) {
      throw new Error('Cannot construct a filter without an ID');
    }
    if (typeof labels === 'undefined' || labels === null) {
      throw new Error(`Cannot construct a filter without labels : ${id}`);
    }
    if (typeof tabs === 'undefined' || tabs === null) {
      throw new Error(`Cannot construct a filter without specyfying applicable tabs: ${id}`);
    }
    if (typeof isOnFilterBar === 'undefined') {
      throw new Error(
        `Cannot construct a filter without specyfying if it should be on the Filter Bar: ${id}`
      );
    }
    if (typeof isTaskFilter === 'undefined') {
      throw new Error(
        `Cannot construct a filter without specyfying if it applies to filtering tasks or not  (or, for example, if it only applies to filtering charts): ${id}`
      );
    }
    if (
      typeof params === 'undefined' ||
      params === null ||
      !Array.isArray(params) ||
      params.length === 0
    ) {
      throw new Error(
        `Cannot construct a filter ${id} without specifying at least one param (${params})`
      );
    }

    this.id = id;
    this.labels = labels;
    this.tabs = tabs;
    this.isOnFilterBar = isOnFilterBar;
    this.isTaskFilter = isTaskFilter;
    this.pluralizeOptionLabels = pluralizeOptionLabels;
    this.params = params;
  }

  getDefaultSuperProps = () => ({
    id: this.id,
    labels: this.labels,
    tabs: this.tabs,
    isOnFilterBar: this.isOnFilterBar,
    isTaskFilter: this.isTaskFilter,
    pluralizeOptionLabels: this.pluralizeOptionLabels,
  });

  newFilterWithParams = (params) => {
    if (typeof params === 'undefined' || params === null) {
      throw new Error(`Cannot set null or undefined params on filter ${this.id} (${params})`);
    }
    if (!Array.isArray(params) || params.length === 0) {
      throw new Error(
        `The params object provided to update filter ${this.id} is not an array with at least one element (${params})`
      );
    }
    if (params[0] === null) {
      throw new Error(`The first param of filter ${this.id} cannot be null`);
    }
    const newFilter = this.new;
    newFilter.params = params;
    return newFilter;
  };

  getActiveFilterIdAndParamIds = (currentTabId) => {
    if (!this.isActive(currentTabId)) {
      return null;
    }
    const filterIdAndParamIds = {
      filterId: this.id,
      params: this.params,
    };
    return filterIdAndParamIds;
  };

  appliesToTab = (currentTab) =>
    typeof currentTab === 'undefined' || currentTab === null || this.tabs.includes(currentTab.id);

  isSortFilter = () => this.id === FILTER_IDS.SORT;

  // for date filters to override if the filter selects past tasks
  selectsPastTasks = () => {
    return false;
  };
}
