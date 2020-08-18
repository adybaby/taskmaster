export const INTEREST_STATUS = {
  CONTACTING: 'CONTACTING',
  APPLYING: 'APPLYING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
};

export const VACANCY_STATUS = {
  PREPARING: 'Preparing',
  OPEN: 'Open',
  CLOSED: 'Closed',
};

export const DB_STATUS = {
  NOT_INITIALISED: 'NOT_INITIALISED',
  INITIALISING: 'INITIALISING',
  INITIALISED: 'INITIALISED',
  ERROR: 'ERROR',
  OPERATION_COMPLETE: 'OPERATION_COMPLETE',
};

export const VACANCY_ROLE = {
  FULL_TIME: 'Full Time',
  MENTORING: 'Mentoring',
  CONSULTANCY: 'Consultancy',
  USER: 'User',
};

export const VACANCY_PRIORITY = {
  ESSENTIAL: 'Essential',
  DESIRABLE: 'Desirable',
};

export const CONTRIBUTION_LEVELS = [
  { value: 'Major', label: 'Major: Unlikely to succeed without this contribution' },
  { value: 'Minor', label: 'Minor: Is a helpful contribution, but not essential' },
  { value: 'DeRisking', label: 'DeRisking: Contributes to our understanding of how to proceed.' },
];
