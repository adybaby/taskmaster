export const stripQuotes = str => {
  if (str != null && str.length > 0) {
    return str.replace(/^"(.+(?="$))"$/, '$1');
  }
  return str;
};

const escapeRegExp = (
  str // or better use 'escape-string-regexp' package
) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export const filterBy = term => {
  // eslint-disable-next-line no-undef
  const re = new RegExp(escapeRegExp(term), 'i');
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
