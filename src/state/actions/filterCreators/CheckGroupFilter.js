import { Filter } from './Filter';

export class CheckGroupFilter extends Filter {
  isCheckGroupFilter = true;

  options;

  params;

  maxChecked;

  defaultCheckedOptions;

  constructor({ options, ...filterProps }) {
    const maxChecked = 20;

    const makeCheckList = () =>
      options
        .map((option, index) =>
          index < maxChecked
            ? { id: option.id, label: option.label, checked: true }
            : { id: option.id, label: option.label, checked: false }
        )
        .sort();

    super({ params: makeCheckList(), ...filterProps });
    if (typeof options === 'undefined' || options === null || options.length === 0) {
      throw new Error('Cannot construct a check group filter without options');
    }

    this.maxChecked = maxChecked;
    this.options = options;
    this.defaultCheckedOptions = makeCheckList();
  }

  get new() {
    return new CheckGroupFilter({
      id: this.id,
      labels: this.labels,
      tabs: this.tabs,
      isOnFilterBar: this.isOnFilterBar,
      isTaskFilter: this.isTaskFilter,
      options: this.options,
    });
  }

  getChecked = () => this.params.filter((param) => param.checked);

  isActive = (currentTab) => {
    if (!this.appliesToTab(currentTab)) {
      return false;
    }
    let active = false;
    let i = 0;
    while (i < this.params.length && !active) {
      active = this.params[i].checked !== this.defaultCheckedOptions[i].checked;
      i++;
    }
    return active;
  };
}
