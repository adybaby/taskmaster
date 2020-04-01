import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { skillsReducer } from './SkillsReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { filterBarVisibleReducer, filterControlsReducer } from './TaskFilterReducer';
import { sortOrderReducer } from './SortOrderReducer';
import { dbReducer } from './DbReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  users: usersReducer,
  skills: skillsReducer,
  dateRange: dateRangeReducer,
  currentUser: currentUserReducer,
  filterControls: filterControlsReducer,
  filterBarVisible: filterBarVisibleReducer,
  sortOrder: sortOrderReducer,
  dbStatus: dbReducer,
});

export default rootReducer;
