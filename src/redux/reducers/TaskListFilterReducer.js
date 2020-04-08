import * as TYPES from '../ActionTypes';

const resetTaskListFilterControl = (filterControl) =>
  filterControl.type === 'TEXT'
    ? { ...filterControl, text: '' }
    : { ...filterControl, selectedId: filterControl.defaultId };

export const taskListFilterControlsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_TASK_LIST_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.filterControl.id
          ? { ...filterControl, ...action.filterControl }
          : filterControl
      );
    }
    case TYPES.SET_TASK_LIST_FILTER_CONTROLS: {
      return action.filterControls;
    }
    case TYPES.RESET_TASK_LIST_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.id ? resetTaskListFilterControl(filterControl) : filterControl
      );
    }
    case TYPES.RESET_ALL_TASK_LIST_FILTER_CONTROLS: {
      return state.map((filterControl) => resetTaskListFilterControl(filterControl));
    }
    default:
      return state;
  }
};
