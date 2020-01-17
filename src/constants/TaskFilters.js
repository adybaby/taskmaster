export const CREATED_OPTIONS = {
  ANY_TIME: 'Any Time',
  TODAY: 'Today',
  THIS_WEEK: 'Past Week',
  THIS_MONTH: 'Past Month',
  THIS_YEAR: 'Past Year',
  OLDER: 'Older than a year'
};

export const DEFAULTS = {
  CREATED_ON: CREATED_OPTIONS.ANY_TIME,
  VACANCIES: 'Any Vacancies',
  CREATED_BY: 'Any Author',
  TYPE: 'All',
  SEARCH_TERM: null
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
