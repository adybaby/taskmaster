export const FIELDS = {
  NECESSITY: {
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
    FULL_TIME: { id: 'FULL_TIME', label: 'as team member' },
    CONSULTANCY: { id: 'CONSULTANCY', label: 'for consultancy' },
    MENTORING: { id: 'MENTORING', label: 'for mentoring' },
    USER: { id: 'USER', label: 'for user guidance' },
  },
};

export const decodeField = (field, key) =>
  Object.entries(field).find(([i, val]) => val.key === key)[1];
