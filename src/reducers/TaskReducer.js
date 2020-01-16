import { combineReducers } from 'redux';
import * as TYPES from '../constants/ActionTypes';

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

const taskFilterReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_TASK_FILTER:
      return [...state.filter(filter => filter.type !== action.filter.type), action.filter];
    case TYPES.REMOVE_TASK_FILTER:
      return state.filter(filter => filter.type !== action.filter.type);
    case TYPES.CLEAR_FILTERS:
      return [];
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

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilter: taskFilterReducer,
  tasksLoaded: tasksLoadedReducer
});

export default rootReducer;
