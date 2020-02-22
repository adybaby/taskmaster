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
