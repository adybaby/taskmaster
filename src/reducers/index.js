import { combineReducers } from 'redux';
import {
  taskReducer,
  taskFilterReducer,
  taskStatusReducer,
  sortOrderReducer,
  searchTermReducer,
  tabReducer,
  filterBarVisibleReducer
} from './TaskReducer';
import { userReducer, userStatusReducer, allUsersReducer } from './UserReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  taskFilters: taskFilterReducer,
  taskStatus: taskStatusReducer,
  sortOrder: sortOrderReducer,
  searchTerm: searchTermReducer,
  tab: tabReducer,
  filterBarVisible: filterBarVisibleReducer,
  user: userReducer,
  userStatus: userStatusReducer,
  allUsers: allUsersReducer
});

export default rootReducer;
