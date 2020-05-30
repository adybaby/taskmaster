import { Filter } from './Filter';
import { beforeOrE } from '../../../util/Dates';

export class SelectFilter extends Filter {
  isSelectFilter = true;

  options;

  constructor({ options, forPastTasks, ...filterProps }) {
    super({ ...filterProps });
    if (typeof options === 'undefined' || options === null || options.length === 0) {
      throw new Error('Cannot construct a select filter without options');
    }
    this.options = options;

    this.defaultParams = [options[0].id];

    if (typeof forPastTasks !== 'undefined') {
      this.forPastTasks = forPastTasks;
    }
  }

  selectsPastTasks = (params) => {
    if (typeof this.forPastTasks !== 'undefined') {
      return this.forPastTasks;
    }
    if (typeof params !== 'undefined' && params.length === 3) {
      return beforeOrE(params[2], new Date());
    }
    return false;
  };

  execute = (tasks, params) => {
    const [selectedOption, ...otherParams] = params;
    return this.options.find((option) => option.id === selectedOption).execute(tasks, otherParams);
  };

  isDefaultParams = (params) => {
    return params.length === 1 && params[0] === this.defaultParams[0];
  };
}
