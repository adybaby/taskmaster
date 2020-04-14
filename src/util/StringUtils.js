/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */

const LIST_DELIM = ',';

export const cleanString = (str) => {
  if (typeof str !== 'undefined' && str !== null) {
    const trimmed = str.trim();
    if (trimmed.length > 0) {
      return trimmed.replace(/^"(.+(?="$))"$/, '$1');
    }
  }
  return null;
};

export const parseListFromString = (str) => {
  const cleanedStr = cleanString(str);
  if (cleanedStr !== null) {
    return cleanedStr.split(LIST_DELIM).map((string) => cleanString(string));
  }
  return [];
};

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
