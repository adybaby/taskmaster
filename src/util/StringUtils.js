/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
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

const formatDate = date => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const parseDate = dateStr => {
  const cleanedDateStr = cleanString(dateStr);
  const date = Date.parse(cleanedDateStr);

  if (!isNaN(Date.parse(cleanedDateStr))) {
    return formatDate(new Date(date));
  }

  if (cleanedDateStr === 'TBD') {
    return cleanedDateStr;
  }

  return null;
};

export const parseDateList = (fieldStrings, startIndex, targetObj, targetField) => {
  let index = startIndex;
  targetObj[targetField] = [];

  for (index; index < fieldStrings.length; index++) {
    const period = {};
    let nextDateStr = parseDate(fieldStrings[index]);

    if (nextDateStr === null) {
      if (index === startIndex) {
        throw new Error(
          `Expected from date for ${fieldStrings[0]}(${targetField}),instead got ${fieldStrings[index]}`
        );
      }
      return index - 1;
    }
    period.from = nextDateStr;
    if (index === fieldStrings.length) {
      return index - 1;
    }
    nextDateStr = parseDate(fieldStrings[index + 1]);
    if (nextDateStr === null) {
      let outputStr = '';
      fieldStrings.forEach(str => {
        outputStr += `${str} `;
      });
      throw new Error(`Expected to date,instead got ${fieldStrings[index + 1]} (${outputStr})`);
    }
    period.to = nextDateStr;
    targetObj[targetField].push(period);
    index++;
  }
  return index - 1;
};

export const plannedDates = (start, end) => {
  if (typeof start === 'undefined' || start === null || start.length === 0) {
    return `Planned to finish on ${parseDate(end)} (start date TBD)`;
  }
  if (typeof end === 'undefined' || end === null || end.length === 0) {
    return `Planned to start on ${parseDate(start)} (end date TBD)`;
  }
  return `Planned to run from ${parseDate(start)} to ${parseDate(end)}`;
};

const vacancyDate = date => {
  if (typeof date.to === 'undefined' || date.to === null || date.to.length === 0) {
    return `Starting on ${parseDate(date.from)} (end date TBD)`;
  }
  if (typeof date.from === 'undefined' || date.from === null || date.from.length === 0) {
    return `Finishing on ${parseDate(date.to)} (start date TBD)`;
  }
  return `From ${parseDate(date.from)} to ${parseDate(date.to)}`;
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
