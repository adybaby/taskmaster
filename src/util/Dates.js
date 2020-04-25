/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const isValidDateString = (dateStr) => {
  if (
    typeof dateStr !== 'undefined' &&
    dateStr !== null &&
    typeof dateStr === 'string' &&
    isNaN(dateStr)
  ) {
    const d = new Date(dateStr);
    return d !== 'Invalid Date' && !isNaN(d);
  }
  return false;
};

export const isValidDate = (date) =>
  typeof date !== 'undefined' &&
  date !== null &&
  date instanceof Date &&
  date !== 'Invalid Date' &&
  !isNaN(date);

export const ukToUs = (dateStr) => {
  if (!isValidDateString(dateStr)) return null;

  const delim = dateStr.includes('/')
    ? /\//g
    : dateStr.includes('-')
    ? '-'
    : dateStr.includes(' ')
    ? ' '
    : dateStr.includes(':')
    ? ':'
    : null;

  if (delim !== null) {
    const parts = dateStr.split(delim);
    if (parts.length === 3 && !isNaN(parts[1])) {
      return [parts[1], parts[0], parts[2]].join('/');
    }
  }
  return dateStr;
};

export const dateOnly = (date) => {
  if (!isValidDate(date)) return null;
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
};

export const equals = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() === dateOnly(date2).getTime();
};

export const before = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() < dateOnly(date2).getTime();
};

export const after = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() > dateOnly(date2).getTime();
};

export const beforeOrE = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() <= dateOnly(date2).getTime();
};

export const afterOrE = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() >= dateOnly(date2).getTime();
};

export const first = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() <= dateOnly(date2).getTime() ? date1 : date2;
};

export const last = (date1, date2) => {
  if (!isValidDate(date1) || !isValidDate(date2)) return null;
  return dateOnly(date1).getTime() > dateOnly(date2).getTime() ? date1 : date2;
};

// return the given date with the number of days added to it. if no date is given, returns towday.
export const day = (date, days) => {
  const d = isValidDate(date) ? new Date(date.getTime()) : new Date();
  if (typeof days === 'undefined' || days === null) return d;
  d.setDate(d.getDate() + days);
  return dateOnly(d);
};

export const getDateRangeForWeek = (date) => {
  if (!isValidDate(date)) return null;
  return {
    from: day(startOfWeek(date, { weekStartsOn: 1 }), 1),
    to: day(endOfWeek(date, { weekStartsOn: 1 }), -2),
  };
};

export const getDateRangeForMonth = (date) => {
  if (!isValidDate(date)) return null;
  return { from: day(startOfMonth(date), 1), to: endOfMonth(date) };
};

export const getDateRangeForYear = (date) => {
  if (!isValidDate(date)) return null;
  const year = date.getFullYear();
  return { from: new Date(year, 0, 1), to: new Date(year, 11, 31) };
};

export const areDateRangesOverlapping = (range1, range2) =>
  !(before(range1.to, range2.from) || after(range1.from, range2.to));

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
  const inDay = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return isNaN(date.getTime()) ? date : `${inDay} ${monthNames[monthIndex]} ${year}`;
};

export const formatDateRange = ({ from, to }) => {
  if (from === null && to === null) return '';
  if (from !== null && to !== null && equals(from, to)) return `on ${formatDate(to)}`;
  if (from === null) return `before ${formatDate(to)}`;
  if (to === null) return `after ${formatDate(from)}`;
  return `between ${formatDate(from)} and ${formatDate(to)}`;
};

export const filterTasksByDate = (tasks, range, dateField) => {
  return tasks.filter((task) => {
    if (typeof task[dateField] === 'undefined' || task[dateField] === null) return false;

    const date = dateOnly(task[dateField]).getTime();
    const from = dateOnly(range.from).getTime();
    const to = dateOnly(range.to).getTime();

    return (from === null || date >= from) && (to === null || date <= to);
  });
};
