import { ACTION_TYPES, FILTER_TYPES } from '../../constants/Constants';

const resetTaskListFilterControl = (filterControl) =>
  filterControl.type.id === FILTER_TYPES.TEXT.id
    ? { ...filterControl, text: '' }
    : { ...filterControl, selectedId: filterControl.defaultId };

export const taskListFilterControlsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASK_LIST_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.filterControl.id
          ? { ...filterControl, ...action.filterControl }
          : filterControl
      );
    }
    case ACTION_TYPES.SET_TASK_LIST_FILTER_CONTROLS: {
      return action.filterControls;
    }
    case ACTION_TYPES.RESET_TASK_LIST_FILTER_CONTROL: {
      return state.map((filterControl) =>
        filterControl.id === action.id ? resetTaskListFilterControl(filterControl) : filterControl
      );
    }
    case ACTION_TYPES.RESET_ALL_TASK_LIST_FILTER_CONTROLS: {
      return state.map((filterControl) => resetTaskListFilterControl(filterControl));
    }
    default:
      return state;
  }
};
