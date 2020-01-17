import { combineReducers } from 'redux';
import * as TYPES from '../constants/ActionTypes';
import * as SORT_ORDER from '../constants/SortOrders';
import { STATE_INIT, DEFAULTS } from '../constants/TaskFilters';

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_TASKS: {
      // console.log(action.tasks);
      return [...state, ...action.tasks];
    }
    case TYPES.ADD_TASK:
      return state.concat(action.task);
    case TYPES.REMOVE_TASK:
      return state.filter(task => task.id !== action.task.id);
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

const tasksLoadedReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SET_TASKS_LOADED: {
      return action.tasksLoaded;
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

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilters: taskFilterReducer,
  tasksLoaded: tasksLoadedReducer,
  sortOrder: sortOrderReducer
});

export default rootReducer;
