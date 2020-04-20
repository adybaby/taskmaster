/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export const doesObjectIncludeStr = (str) => {
  const escapeRegExp = () => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  const re = new RegExp(escapeRegExp(str), 'i');
  return (srch) => {
    for (const prop in srch) {
      if (!srch.hasOwnProperty(prop)) {
        continue;
      }
      if (re.test(srch[prop])) {
        return true;
      }
    }
    return false;
  };
};
