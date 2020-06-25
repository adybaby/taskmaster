/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, min, max } from 'date-fns';

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
  if (
    typeof dateStr === 'undefined' ||
    dateStr === null ||
    (typeof dateStr !== 'string' && !isNaN(dateStr))
  ) {
    return null;
  }

  const delim = dateStr.includes('/')
    ? /\//g
    : dateStr.includes('-')
    ? '-'
    : dateStr.includes('_')
    ? '_'
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

export const sameRange = (range1, range2) => {
  return equals(range1.startDate, range2.startDate) && equals(range1.endDate, range2.endDate);
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
    startDate: day(startOfWeek(date, { weekStartsOn: 1 }), 1),
    endDate: day(endOfWeek(date, { weekStartsOn: 1 }), -2),
  };
};

export const getDateRangeForMonth = (date) => {
  if (!isValidDate(date)) return null;
  return { startDate: day(startOfMonth(date), 1), endDate: endOfMonth(date) };
};

export const getDateRangeForYear = (date) => {
  if (!isValidDate(date)) return null;
  const year = date.getFullYear();
  return { startDate: new Date(year, 0, 1), endDate: new Date(year, 11, 31) };
};

export const areDateRangesOverlapping = (range1, range2) =>
  !(before(range1.endDate, range2.startDate) || after(range1.startDate, range2.endDate));

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

export const formatUrlDate = (date) => {
  return `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
};

export const formatDateRange = ({ startDate, endDate }) => {
  if (startDate === null && endDate === null) return '';
  if (startDate !== null && endDate !== null && equals(startDate, endDate))
    return `on ${formatDate(endDate)}`;
  if (startDate === null) return `before ${formatDate(endDate)}`;
  if (endDate === null) return `after ${formatDate(startDate)}`;
  return `between ${formatDate(startDate)} and ${formatDate(endDate)}`;
};

export const filterTasksByDate = (tasks, range, dateField) => {
  return tasks.filter((task) => {
    if (typeof task[dateField] === 'undefined' || task[dateField] === null) return false;

    const date = dateOnly(task[dateField]).getTime();
    const startDate = dateOnly(range.startDate).getTime();
    const endDate = dateOnly(range.endDate).getTime();

    return (startDate === null || date >= startDate) && (endDate === null || date <= endDate);
  });
};

export const firstLastDates = (tasks, users) => {
  const allDates = [
    ...tasks
      .filter((task) => task.type === 'INITIATIVE')
      .map((task) => [task.startDate, task.endDate])
      .flat(),
    ...users
      .map((user) => user.available.map((available) => [available.startDate, available.endDate]))
      .flat(2),
  ];
  return { first: min(allDates), last: max(allDates) };
};

// re serialises all the data passed, then deserialises it parsing the dates as actual date objects
export const stringDatesToRealDates = (data) => {
  return JSON.parse(JSON.stringify(data), (key, value) =>
    isValidDateString(value) ? new Date(value) : value
  );
};
