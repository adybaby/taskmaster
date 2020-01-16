export const stripQuotes = str => {
  if (str != null && str.length > 0) {
    return str.replace(/^"(.+(?="$))"$/, '$1');
  }
  return str;
};

export const filterBy = term => {
  // eslint-disable-next-line no-undef
  const re = new RegExp(escapeRegExp(term), 'i');
  return person => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in person) {
      // eslint-disable-next-line no-prototype-builtins
      if (!person.hasOwnProperty(prop)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (re.test(person[prop])) {
        return true;
      }
    }
    return false;
  };
};
