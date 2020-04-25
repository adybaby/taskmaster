export const FIELDS = {
  PRIORITY: {
    ESSENTIAL: { id: 'ESSENTIAL', label: 'Essential' },
    DESIRABLE: { id: 'DESIRABLE', label: 'Desirable' },
  },
  STATUS: {
    OPEN: { id: 'OPEN', label: 'Open' },
    CLOSED: { id: 'CLOSED', label: 'Closed' },
  },
  INTEREST_STATUS: {
    NOT_REVIEWED: { id: 'NOT_REVIEWED', label: 'Not Reviewed' },
    ACCEPTED: { id: 'ACCEPTED', label: 'Accepted' },
    TENTATIVE: { id: 'TENTATIVE', label: 'Tentative' },
    REJECTED: { id: 'REJECTED', label: 'Rejected' },
  },
  ROLE: {
    FULL_TIME: { id: 'FULL_TIME', label: 'Team member' },
    CONSULTANCY: { id: 'CONSULTANCY', label: 'Consultant' },
    MENTORING: { id: 'MENTORING', label: 'Mentoring' },
    USER: { id: 'USER', label: 'User Guidance' },
  },
};

const getLabel = (field, value) => Object.values(field).find((val) => val.id === value).label;

export const getPriorityLabel = (value) => getLabel(FIELDS.PRIORITY, value);
export const getStatusLabel = (value) => getLabel(FIELDS.STATUS, value);
export const getInterestStatusLabel = (value) => getLabel(FIELDS.INTEREST_STATUS, value);
export const getRoleLabel = (value) => getLabel(FIELDS.ROLE, value);
