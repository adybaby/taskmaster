import { FILTER_IDS } from '../../../constants/Constants';

export class Filter {
  id;

  labels;

  tabs;

  isOnFilterBar;

  isTaskFilter;

  pluralizeOptionLabels;

  constructor({ id, labels, tabs, isOnFilterBar, isTaskFilter, pluralizeOptionLabels }) {
    if (id == null) {
      throw new Error('Cannot construct a filter without an ID');
    }
    if (labels == null) {
      throw new Error(`Cannot construct a filter without labels : ${id}`);
    }
    if (tabs == null) {
      throw new Error(`Cannot construct a filter without specyfying applicable tabs: ${id}`);
    }
    if (isOnFilterBar == null) {
      throw new Error(
        `Cannot construct a filter without specyfying if it should be on the Filter Bar: ${id}`
      );
    }
    if (isTaskFilter == null) {
      throw new Error(
        `Cannot construct a filter without specyfying if it applies to filtering tasks or not  (or, for example, if it only applies to filtering charts): ${id}`
      );
    }

    this.id = id;
    this.labels = labels;
    this.tabs = tabs;
    this.isOnFilterBar = isOnFilterBar;
    this.isTaskFilter = isTaskFilter;
    this.pluralizeOptionLabels = pluralizeOptionLabels;
  }

  appliesToTab = (tabId) => this.tabs.includes(tabId);

  isSortFilter = () => this.id === FILTER_IDS.SORT;

  // for date filters to override if the filter selects past tasks
  // eslint-disable-next-line no-unused-vars
  selectsPastTasks = (params) => {
    return false;
  };
}
