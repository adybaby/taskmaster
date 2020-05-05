import { Filter } from './Filter';

export class SelectFilter extends Filter {
  isSelectFilter = true;

  options;

  defaultOptionId;

  params;

  constructor({ options, ...filterProps }) {
    super({ params: [options[0].id], ...filterProps });
    if (typeof options === 'undefined' || options === null || options.length === 0) {
      throw new Error('Cannot construct a select filter without options');
    }
    this.options = options;
    this.defaultOptionId = options[0].id;
  }

  get selectedOption() {
    return this.options.find((option) => option.id === this.params[0]);
  }

  get new() {
    return new SelectFilter({
      id: this.id,
      label: this.label,
      tabs: this.tabs,
      isOnFilterBar: this.isOnFilterBar,
      isTaskFilter: this.isTaskFilter,
      options: this.options,
    });
  }

  get customRange() {
    return this.params.length === 3
      ? {
          from: this.params[1],
          to: this.params[2],
        }
      : undefined;
  }

  get range() {
    return typeof this.selectedOption.range !== 'undefined'
      ? this.selectedOption.range
      : this.customRange;
  }

  isSelected = (option) => this.params[0].id === option.id;

  isActive = (currentTab) => {
    return this.appliesToTab(currentTab) && this.params[0] !== this.defaultOptionId;
  };

  execute = (tasks, currentTabId) => {
    if (!this.isActive(currentTabId)) {
      return tasks;
    }
    return this.options
      .find((option) => option.id === this.params[0])
      .execute(tasks, this.customRange);
  };
}
