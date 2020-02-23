const LIST_DELIM = ',';

export const cleanString = str => {
  if (typeof str !== 'undefined' && str !== null) {
    const trimmed = str.trim();
    if (trimmed.length > 0) {
      return trimmed.replace(/^"(.+(?="$))"$/, '$1');
    }
  }
  return null;
};

export const parseListFromString = str => {
  const cleanedStr = cleanString(str);
  if (cleanedStr !== null) {
    return cleanedStr.split(LIST_DELIM).map(string => cleanString(string));
  }
  return null;
};

export const doesObjectIncludeStr = str => {
  const escapeRegExp = () => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  // eslint-disable-next-line no-undef
  const re = new RegExp(escapeRegExp(str), 'i');
  return srch => {
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
