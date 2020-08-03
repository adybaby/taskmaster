import { combineReducers } from 'redux';
import { currentUserReducer } from './CurrentUserReducer';
import { filterReducer } from './FilterReducer';
import { filterParamsReducer } from './FilterParamsReducer';
import { selectedChartReducer } from './SelectedChartReducer';
import { dbStatusReducer } from './DbStatusReducer';
import { currentTabReducer } from './CurrentTabReducer';
import { filterBarVisibleReducer } from './FilterBarVisibleReducer';
import { taskSummariesReducer } from './TaskSummariesReducer';
import { skillsReducer } from './SkillsReducer';
import { usersReducer } from './UserReducer';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentTab: currentTabReducer,
  selectedChart: selectedChartReducer,
  filterBarVisible: filterBarVisibleReducer,
  filters: filterReducer,
  filterParams: filterParamsReducer,
  taskSummaries: taskSummariesReducer,
  skills: skillsReducer,
  users: usersReducer,
  dbStatus: dbStatusReducer,
});

export default rootReducer;
