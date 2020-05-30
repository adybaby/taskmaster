import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { currentUserReducer, usersReducer } from './UserReducer';
import { skillsReducer } from './SkillsReducer';
import { vacanciesReducer } from './VacanciesReducer';
import { interestReducer } from './InterestReducer';
import { contributionLinksReducer } from './ContributionLinksReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { filterReducer } from './FilterReducer';
import { filterParamsReducer } from './FilterParamsReducer';
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
  filterParams: filterParamsReducer,
  currentTab: currentTabReducer,
  selectedChart: selectedChartReducer,
  filterBarVisible: filterBarVisibleReducer,
  dbStatus: dbReducer,
  vacancies: vacanciesReducer,
  interest: interestReducer,
  contributionLinks: contributionLinksReducer,
});

export default rootReducer;
