import { ACTION_TYPES } from './ActionTypes';

export const setDateRange = (dateRange) => ({
  type: ACTION_TYPES.SET_DATE_RANGE,
  dateRange,
});
