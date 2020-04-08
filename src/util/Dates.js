/* eslint-disable no-restricted-globals */
import { cleanString } from './StringUtils';

export const formatDate = (date) => {
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
    'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return isNaN(date.getTime()) ? date : `${day} ${monthNames[monthIndex]} ${year}`;
};

export const parseDate = (dateStr) => {
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

export const filterTasksByDate = (tasks, fromTo, dateField) => {
  const dateOnly = (date) => {
    if (typeof date === 'undefined' || date === null) return null;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  if (fromTo.from === -1) return [];

  return tasks.filter((task) => {
    if (task[dateField] === null) return false;

    const date = dateOnly(task[dateField]);
    const from = dateOnly(fromTo.from);
    const to = dateOnly(fromTo.to);

    return (from === null || date >= from) && (to === null || date <= to);
  });
};

export const now = (days, date) => {
  if (days === undefined) return new Date().getTime();
  const d = typeof date === 'undefined' ? new Date() : new Date(date);
  d.setDate(d.getDate() + days);
  return d.getTime();
};
