import { Filter } from './Filter';

export class TextFilter extends Filter {
  isTextFilter = true;

  constructor(filterParams) {
    super(filterParams);
    this.defaultParams = [''];
  }

  execute = (tasks, params) => {
    const doesObjectIncludeStr = (str) => {
      const escapeRegExp = () => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

      const re = new RegExp(escapeRegExp(str), 'i');
      return (srch) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in srch) {
          // eslint-disable-next-line no-prototype-builtins
          if (!srch.hasOwnProperty(prop)) {
            // eslint-disable-next-line no-continue
            continue;
          }
          if (re.test(srch[prop])) {
            return true;
          }
        }
        return false;
      };
    };

    return tasks.filter(doesObjectIncludeStr(params[0]));
  };

  isDefaultParams = (params) => {
    return params[0] === '';
  };
}
