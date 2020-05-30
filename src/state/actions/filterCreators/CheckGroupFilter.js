import { Filter } from './Filter';

export class CheckGroupFilter extends Filter {
  isCheckGroupFilter = true;

  options;

  maxChecked;

  constructor({ options, ...filterProps }) {
    const maxChecked = 20;

    super(filterProps);
    if (typeof options === 'undefined' || options === null || options.length === 0) {
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

  isDefaultParams = (params) => {
    for (let index = 0; index < params.length; index++) {
      const param = params[index];
      if (this.defaultParams.find((dp) => dp.id === param.id).checked !== param.checked) {
        return false;
      }
    }
    return true;
  };
}
