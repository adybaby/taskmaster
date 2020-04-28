import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { skillsReducer } from './SkillsReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { taskListFilterControlsReducer } from './TaskListFilterReducer';
import { chartFilterControlsReducer } from './ChartFilterReducer';
import { sortOrderReducer } from './SortOrderReducer';
import { dbReducer } from './DbReducer';
import { currentTabReducer } from './CurrentTabReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  users: usersReducer,
  skills: skillsReducer,
  dateRange: dateRangeReducer,
  currentUser: currentUserReducer,
  taskListfilterControls: taskListFilterControlsReducer,
  chartFilterControls: chartFilterControlsReducer,
  sortOrder: sortOrderReducer,
  currentTab: currentTabReducer,
  dbStatus: dbReducer,
});

export default rootReducer;
