const cleanString = str => {
  if (typeof str !== 'undefined' && str !== null) {
    const trimmed = str.trim();
    if (trimmed.length > 0) {
      return trimmed.replace(/^"(.+(?="$))"$/, '$1');
    }
  }
  return null;
};

export default cleanString;
