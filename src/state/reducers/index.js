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
import { tagsReducer } from './TagsReducer';

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
  tags: tagsReducer,
  dbStatus: dbStatusReducer,
});

export default rootReducer;
