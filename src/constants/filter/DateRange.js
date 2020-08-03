import {
  day,
  getDateRangeForWeek,
  getDateRangeForMonth,
  getDateRangeForYear,
} from '../../util/Dates';

export const DATE_RANGE = {
  ANY: { id: 'ANY', label: 'at any time', range: { startDate: null, endDate: null } },
  TODAY: { id: 'TODAY', label: 'today', range: { startDate: day(), endDate: day() } },
  THIS_WEEK: { id: 'THIS_WEEK', label: 'this week', range: getDateRangeForWeek(day()) },
  THIS_MONTH: { id: 'THIS_MONTH', label: 'this month', range: getDateRangeForMonth(day()) },
  THIS_YEAR: { id: 'THIS_YEAR', label: 'this year', range: getDateRangeForYear(day()) },
  PAST_WEEK: {
    id: 'PAST_WEEK',
    label: 'in the past week',
    range: { startDate: day(null, -7), endDate: day() },
  },
  PAST_MONTH: {
    id: 'PAST_MONTH',
    label: 'in the past month',
    range: { startDate: day(null, -31), endDate: day() },
  },
  PAST_YEAR: {
    id: 'PAST_YEAR',
    label: 'in the past year',
    range: { startDate: day(null, -365), endDate: day() },
  },
  OLDER: {
    id: 'OLDER',
    label: 'over a year ago',
    range: { startDate: null, endDate: day(null, -365) },
  },
  COMING_WEEK: {
    id: 'COMING_WEEK',
    label: 'in the coming week',
    range: { startDate: day(), endDate: day(null, 7) },
  },
  COMING_MONTH: {
    id: 'COMING_MONTH',
    label: 'in the coming month',
    range: { startDate: day(), endDate: day(null, 31) },
  },
  COMING_YEAR: {
    id: 'COMING_YEAR',
    label: 'in the coming year',
    range: { startDate: day(), endDate: day(null, 365) },
  },
  NEXT_YEAR: { id: 'NEXT_YEAR', label: 'next year', range: getDateRangeForYear(day(null, 365)) },
  CUSTOM_DATES: { id: `CUSTOM_DATES`, label: 'Custom Range..', range: null },
};
