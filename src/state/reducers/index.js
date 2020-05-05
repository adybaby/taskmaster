import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { skillsReducer } from './SkillsReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { filterReducer } from './FilterReducer';
import { selectedChartReducer } from './SelectedChartReducer';
import { dbReducer } from './DbReducer';
import { currentTabReducer } from './CurrentTabReducer';
import { filterBarVisibleReducer } from './FilterBarVisibleReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  users: usersReducer,
  skills: skillsReducer,
  dateRange: dateRangeReducer,
  currentUser: currentUserReducer,
  filters: filterReducer,
  currentTab: currentTabReducer,
  selectedChart: selectedChartReducer,
  filterBarVisible: filterBarVisibleReducer,
  dbStatus: dbReducer,
});

export default rootReducer;
