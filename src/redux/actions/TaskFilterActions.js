import * as TYPES from '../ActionTypes';

export const setFilterBarVisible = (visible) => ({
  type: TYPES.SET_FILTER_BAR_VISIBLE,
  visible,
});

export const setFilterControl = (filterControl) => ({
  type: TYPES.SET_FILTER_CONTROL,
  filterControl,
});

export const setFilterControls = (filterControls) => ({
  type: TYPES.SET_FILTER_CONTROLS,
  filterControls,
});

export const resetFilterControl = (id) => ({
  type: TYPES.RESET_FILTER_CONTROL,
  id,
});

export const resetAllFilterControls = () => ({
  type: TYPES.RESET_ALL_FILTER_CONTROLS,
});
