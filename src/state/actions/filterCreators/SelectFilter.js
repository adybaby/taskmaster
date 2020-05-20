import { Filter } from './Filter';
import { beforeOrE } from '../../../util/Dates';

export class SelectFilter extends Filter {
  isSelectFilter = true;

  options;

  defaultOptionId;

  params;

  constructor({ options, forPastTasks, ...filterProps }) {
    super({ params: [options[0].id], ...filterProps });
    if (typeof options === 'undefined' || options === null || options.length === 0) {
      throw new Error('Cannot construct a select filter without options');
    }
    this.options = options;
    this.defaultOptionId = options[0].id;

    if (typeof forPastTasks !== 'undefined') {
      this.forPastTasks = forPastTasks;
    }
  }

  get selectedOption() {
    return this.options.find((option) => option.id === this.params[0]);
  }

  get new() {
    return new SelectFilter({
      ...this.getDefaultSuperProps(),
      forPastTasks: this.forPastTasks,
      pluralizeOptionLabels: this.pluralizeOptionLabels,
      options: this.options,
    });
  }

  get customRange() {
    return this.params.length === 3
      ? {
          startDate: this.params[1],
          endDate: this.params[2],
        }
      : undefined;
  }

  get range() {
    return typeof this.selectedOption.range !== 'undefined'
      ? this.selectedOption.range
      : this.customRange;
  }

  selectsPastTasks = () => {
    if (typeof this.forPastTasks !== 'undefined') {
      return this.forPastTasks;
    }
    if (typeof this.range !== 'undefined') {
      return beforeOrE(this.range.to, new Date());
    }
    return false;
  };

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
