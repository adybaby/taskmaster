import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { skillsReducer } from './SkillsReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { taskFilterReducer } from './TaskFilterReducer';
import { sortOrderReducer } from './SortOrderReducer';
import { tabReducer } from './TabReducer';
import { dbReducer } from './DbReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  users: usersReducer,
  skills: skillsReducer,
  dateRange: dateRangeReducer,
  currentUser: currentUserReducer,
  taskFilters: taskFilterReducer,
  sortOrder: sortOrderReducer,
  tab: tabReducer,
  dbStatus: dbReducer
});

export default rootReducer;
