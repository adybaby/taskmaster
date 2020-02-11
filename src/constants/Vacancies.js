export const ROLE = {
  FULL_TIME: 'as team member',
  CONSULTANCY: 'for consultancy',
  MENTORING: 'for mentoring',
  USER: 'for user guidance'
};

export const NECESSITY = {
  ESSENTIAL: 'Essential',
  DESIRABLE: 'Desirable'
};

export const STATUS = {
  VACANT: 'Vacant',
  FILLED: 'Filled',
  PARTIAL: 'Partially Filled'
};

export const SHORT_ROLE = {
  F: ROLE.FULL_TIME,
  C: ROLE.CONSULTANCY,
  M: ROLE.MENTORING,
  U: ROLE.USER
};

export const SHORT_NECESSITY = {
  E: NECESSITY.ESSENTIAL,
  D: NECESSITY.DESIRABLE
};

export const SHORT_STATUS = {
  V: STATUS.VACANT,
  F: STATUS.FILLED,
  P: STATUS.PARTIAL
};

export const ANY_DATE = { short: 'A', displayName: 'Flexible on dates' };
