import { Filter } from './Filter';

export class CheckGroupFilter extends Filter {
  isCheckGroupFilter = true;

  options;

  maxChecked;

  constructor({ options, ...filterProps }) {
    const maxChecked = 20;

    super(filterProps);
    if (options == null || options.length === 0) {
      throw new Error('Cannot construct a check group filter without options');
    }

    this.maxChecked = maxChecked;
    this.options = options;
    this.defaultParams = options
      .map((option, index) =>
        index < maxChecked ? { id: option.id, checked: true } : { id: option.id, checked: false }
      )
      .sort();
  }
}
