import { ALL } from './TaskTypes';

export const now = (days, date) => {
  if (days === undefined) return new Date().getTime();
  const d = typeof date === 'undefined' ? new Date() : new Date(date);
  d.setDate(d.getDate() + days);
  return d.getTime();
};

export const DATE_OPTIONS = {
  ANY_TIME: { label: 'Any Time', future: false, query: { from: null, to: null } },
  TODAY: { label: 'Today', future: false, query: { from: now(), to: now() } },
  THIS_WEEK: { label: 'Past Week', future: false, query: { from: now(-7), to: now() } },
  THIS_MONTH: { label: 'Past Month', future: false, query: { from: now(-7), to: now() } },
  THIS_YEAR: { label: 'Past Year', future: false, query: { from: now(-365), to: now() } },
  OLDER: { label: 'Older than a year', future: false, query: { from: null, to: now(-365) } },
  COMING_WEEK: { label: 'Coming Week', future: true, query: { from: now(), to: now(7) } },
  COMING_MONTH: { label: 'Coming Month', future: true, query: { from: now(), to: now(31) } },
  COMING_YEAR: { label: 'Coming Year', future: true, query: { from: now(), to: now(365) } },
  SPECIFIED: { label: 'Custom..', future: false, query: { from: -1, to: -1 } },
};

export const VACANCY_OPTIONS = {
  ANY_VACANCIES: { label: 'Any Vacancies' },
  MY_SKILLS: { label: 'My Skills' },
};

export const DEFAULTS = {
  CREATED_DATE: {
    value: 'ANY_TIME',
    query: DATE_OPTIONS.ANY_TIME.query,
    enabled: true,
  },
  START_DATE: {
    value: 'ANY_TIME',
    query: DATE_OPTIONS.ANY_TIME.query,
    enabled: false,
  },
  END_DATE: {
    value: 'ANY_TIME',
    query: DATE_OPTIONS.ANY_TIME.query,
    enabled: false,
  },
  VACANCIES: { value: 'ANY_VACANCIES', enabled: false },
  CREATED_BY: { value: 'Any Author', query: null, enabled: true },
  TYPE: { value: ALL, query: null, enabled: true },
  SEARCH_TERM: { value: '', query: null, enabled: true },
  FILTER_BAR: { enabled: false },
};

export const STATE_INIT = {
  createdDate: DEFAULTS.CREATED_DATE,
  startDate: DEFAULTS.START_DATE,
  endDate: DEFAULTS.END_DATE,
  vacancies: DEFAULTS.VACANCIES,
  createdBy: DEFAULTS.CREATED_BY,
  type: DEFAULTS.TYPE,
  searchTerm: DEFAULTS.SEARCH_TERM,
  filterBar: DEFAULTS.FILTER_BAR,
};
