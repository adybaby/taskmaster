import { combineReducers } from 'redux';
import * as TYPES from '../constants/ActionTypes';
import * as SORT_ORDER from '../constants/SortOrders';
import { STATE_INIT, DEFAULTS } from '../constants/TaskFilters';
import { NOT_INITIALISED } from '../constants/TaskStatus';
import * as TABS from '../constants/Tabs';

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_TASKS: {
      return action.tasks;
    }
    case TYPES.ADD_TASK:
      return state.concat(action.task);
    case TYPES.REMOVE_TASK:
      return state.filter(task => task.id !== action.task.id);
    case TYPES.CLEAR_TASKS:
      return [];
    default:
      return state;
  }
};

const taskFilterReducer = (state = STATE_INIT, action) => {
  switch (action.type) {
    case TYPES.SET_TASK_FILTER: {
      const value =
        typeof action.filter.value === 'undefined'
          ? state[action.filter.type].value
          : action.filter.value;
      const enabled =
        typeof action.filter.enabled === 'undefined'
          ? state[action.filter.type].enabled
          : action.filter.enabled;
      return {
        ...state,
        [action.filter.type]: { value, enabled }
      };
    }
    case TYPES.CLEAR_TASK_FILTERS:
      return {
        ...state,
        vacancies: { value: DEFAULTS.VACANCIES.value, enabled: true },
        createdBy: { value: DEFAULTS.CREATED_BY.value, enabled: true },
        createdOn: { value: DEFAULTS.CREATED_ON.value, enabled: true }
      };
    default:
      return state;
  }
};

const taskStatusReducer = (state = NOT_INITIALISED, action) => {
  switch (action.type) {
    case TYPES.SET_TASK_STATUS: {
      return action.taskStatus;
    }
    default:
      return state;
  }
};

const sortOrderReducer = (state = SORT_ORDER.DEFAULT, action) => {
  switch (action.type) {
    case TYPES.SET_SORT_ORDER: {
      return action.sortOrder;
    }
    default:
      return state;
  }
};

const searchTermReducer = (state = '', action) => {
  switch (action.type) {
    case TYPES.SET_SEARCH_TERM: {
      return action.searchTerm;
    }
    default:
      return state;
  }
};

const tabReducer = (state = TABS.DEFAULT, action) => {
  switch (action.type) {
    case TYPES.SET_TAB: {
      return action.tab;
    }
    default:
      return state;
  }
};

const filterBarVisibleReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SET_FILTER_BAR_VISIBLE: {
      return action.visible;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilters: taskFilterReducer,
  taskStatus: taskStatusReducer,
  sortOrder: sortOrderReducer,
  searchTerm: searchTermReducer,
  tab: tabReducer,
  filterBarVisible: filterBarVisibleReducer
});

export default rootReducer;
