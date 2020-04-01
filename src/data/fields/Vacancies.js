export const KEYS = {
  NECESSITY: {
    ESSENTIAL: { id: 'ESSENTIAL', label: 'Essential', key: 'E' },
    DESIRABLE: { id: 'DESIRABLE', label: 'Desirable', key: 'D' },
  },
  STATUS: {
    VACANT: { id: 'VACANT', label: 'Vacant', key: 'V' },
    FILLED: { id: 'FILLED', label: 'Filled', key: 'F' },
    PARTIAL: { id: 'PARTIAL', label: 'Partially Filled', key: 'P' },
  },
  ROLE: {
    FULL_TIME: { id: 'FULL_TIME', label: 'as team member', key: 'F' },
    CONSULTANCY: { id: 'CONSULTANCY', label: 'for consultancy', key: 'C' },
    MENTORING: { id: 'MENTORING', label: 'for mentoring', key: 'M' },
    USER: { id: 'USER', label: 'for user guidance', key: 'U' },
  },
  AVAILABILITY: { ANY_DATE: { id: 'ANY_DATE', label: 'Flexible on dates', key: 'A' } },
};

export const decodeKey = (key, field) =>
  Object.entries(KEYS[field]).filter((_key) => _key[1].key === key)[0][1];
