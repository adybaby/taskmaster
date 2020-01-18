import { combineReducers } from 'redux';
import * as TYPES from '../constants/ActionTypes';
import * as SORT_ORDER from '../constants/SortOrders';
import { STATE_INIT, DEFAULTS } from '../constants/TaskFilters';
import { NOT_INITIALISED } from '../constants/TaskStatus';

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
    case TYPES.SET_TASK_FILTER:
      return { ...state, [action.filter.type]: action.filter.value };
    case TYPES.CLEAR_TASK_FILTERS:
      return {
        ...state,
        vacancies: DEFAULTS.VACANCIES,
        createdBy: DEFAULTS.CREATED_BY,
        createdOn: DEFAULTS.CREATED_ON
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

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilters: taskFilterReducer,
  tasksLoaded: taskStatusReducer,
  sortOrder: sortOrderReducer,
  searchTerm: searchTermReducer
});

export default rootReducer;
