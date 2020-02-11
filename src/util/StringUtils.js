export const cleanString = str => {
  if (typeof str !== 'undefined' && str !== null) {
    const trimmed = str.trim();
    if (trimmed.length > 0) {
      return trimmed.replace(/^"(.+(?="$))"$/, '$1');
    }
  }
  return null;
};

export const plannedDates = (start, end) => {
  if (typeof start === 'undefined' || start === null || start.length === 0) {
    return `Planned to finish on ${end} (start date TBD)`;
  }
  if (typeof end === 'undefined' || end === null || end.length === 0) {
    return `Planned to start on ${start} (end date TBD)`;
  }
  return `Planned to run from ${start} to ${end}`;
};

const vacancyDate = date => {
  if (typeof date.to === 'undefined' || date.to === null || date.to.length === 0) {
    return `Starting on ${date.from} (end date TBD)`;
  }
  if (typeof date.from === 'undefined' || date.from === null || date.from.length === 0) {
    return `Finishing on ${date.to} (start date TBD)`;
  }
  return `From ${date.from} to ${date.to}`;
};

export const vacancyDates = dates => {
  let output = '';
  for (let i = 0; i++; i < dates.length) {
    output += vacancyDate(dates[i]);
    if (i < dates.length - 1) {
      output += ', then ';
    }
  }
  return output;
};
