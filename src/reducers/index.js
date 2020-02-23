import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { sortOrderReducer } from './SortOrderReducer';
import { tabReducer } from './TabReducer';
import { taskFilterReducer } from './TaskFilterReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { dbReducer } from './DbReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilters: taskFilterReducer,
  sortOrder: sortOrderReducer,
  tab: tabReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
  dbStatus: dbReducer
});

export default rootReducer;
