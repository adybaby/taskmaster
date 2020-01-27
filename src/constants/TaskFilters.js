import { ALL } from './TaskTypes';

export const CREATED_OPTIONS = {
  ANY_TIME: 'Any Time',
  TODAY: 'Today',
  THIS_WEEK: 'Past Week',
  THIS_MONTH: 'Past Month',
  THIS_YEAR: 'Past Year',
  OLDER: 'Older than a year'
};

export const DEFAULTS = {
  CREATED_ON: { value: CREATED_OPTIONS.ANY_TIME, enabled: true },
  VACANCIES: { value: 'Any Vacancies', enabled: false },
  CREATED_BY: { value: 'Any Author', enabled: true },
  TYPE: { value: ALL, enabled: true },
  SEARCH_TERM: { value: null, enabled: true }
};

export const STATE_INIT = {
  createdOn: DEFAULTS.CREATED_ON,
  vacancies: DEFAULTS.VACANCIES,
  createdBy: DEFAULTS.CREATED_BY,
  type: DEFAULTS.TYPE,
  searchTerm: null
};

export const CLEARED = {
  createdOn: DEFAULTS.CREATED_ON,
  vacancies: DEFAULTS.VACANCIES,
  createdBy: DEFAULTS.CREATED_BY
};
