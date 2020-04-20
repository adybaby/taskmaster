/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export const isValidDateString = (string) =>
  typeof string === 'string' && !isNaN(Date.parse(string)) && isNaN(string);

export const dateOnly = (date) => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
};

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

export const filterTasksByDate = (tasks, range, dateField) => {
  return tasks.filter((task) => {
    if (typeof task[dateField] === 'undefined') return false;

    const date = dateOnly(task[dateField]).getTime();
    const from = dateOnly(range.from).getTime();
    const to = dateOnly(range.to).getTime();

    return (from === null || date >= from) && (to === null || date <= to);
  });
};

export const parseGbDateString = (dateStr) => {
  const delim = dateStr.includes('/')
    ? /\//g
    : dateStr.includes('-')
    ? '-'
    : dateStr.includes(' ')
    ? ' '
    : null;

  if (delim !== null) {
    const parts = dateStr.split(delim);
    if (parts.length === 3 && !isNaN(parts[1])) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    return new Date(dateStr);
  }
  return new Date(dateStr);
};

// return the given date with the number of days added to it. if no date is given, returns towday.
export const day = (date, days) => {
  const d = typeof date === 'undefined' || date === null ? new Date() : new Date(date.getTime());
  if (typeof days === 'undefined' || days === null) return d;
  d.setDate(d.getDate() + days);
  return dateOnly(d);
};

export const getDateRangeForWeek = (date) => {
  if (date === null) return null;
  return {
    from: day(startOfWeek(date, { weekStartsOn: 1 }), 1),
    to: day(endOfWeek(date, { weekStartsOn: 1 }), -2),
  };
};

export const getDateRangeForMonth = (date) => {
  return { from: day(startOfMonth(date), 1), to: endOfMonth(date) };
};

export const getDateRangeForYear = (date) => {
  const year = date.getFullYear();
  return { from: new Date(year, 0, 1), to: new Date(year, 11, 31) };
};

export const equals = (date1, date2) => dateOnly(date1).getTime() === dateOnly(date2).getTime();

export const beforeOrE = (date1, date2) => dateOnly(date1).getTime() <= dateOnly(date2).getTime();

export const afterOrE = (date1, date2) => dateOnly(date1).getTime() >= dateOnly(date2).getTime();

export const first = (date1, date2) =>
  dateOnly(date1).getTime() <= dateOnly(date2).getTime() ? date1 : date2;

export const last = (date1, date2) =>
  dateOnly(date1).getTime() > dateOnly(date2).getTime() ? date1 : date2;
