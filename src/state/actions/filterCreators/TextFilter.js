import { Filter } from './Filter';

export class TextFilter extends Filter {
  isTextFilter = true;

  constructor(filterProps) {
    super({ params: [''], ...filterProps });
  }

  get new() {
    return new TextFilter({
      ...this.getDefaultSuperProps(),
    });
  }

  isActive = (currentTab) => {
    return this.appliesToTab(currentTab) && this.params[0] !== '';
  };

  execute = (tasks, currentTabId) => {
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

    if (!this.isActive(currentTabId)) {
      return tasks;
    }
    return tasks.filter(doesObjectIncludeStr(this.params[0]));
  };
}
