/* eslint-disable no-restricted-globals */
import { cleanString } from './StringUtils';

export const formatDate = date => {
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

  return null;
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
