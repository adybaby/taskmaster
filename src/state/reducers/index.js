import { combineReducers } from 'redux';
import { taskReducer } from './TaskReducer';
import { usersReducer } from './UserReducer';
import { currentUserReducer } from './CurrentUserReducer';
import { skillsReducer } from './SkillsReducer';
import { vacanciesReducer } from './VacanciesReducer';
import { interestReducer } from './InterestReducer';
import { contributionLinksReducer } from './ContributionLinksReducer';
import { dateRangeReducer } from './DateRangeReducer';
import { filterReducer } from './FilterReducer';
import { filterParamsReducer } from './FilterParamsReducer';
import { selectedChartReducer } from './SelectedChartReducer';
import { dbStatusReducer } from './DbStatusReducer';
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
  dbStatus: dbStatusReducer,
  vacancies: vacanciesReducer,
  interest: interestReducer,
  contributionLinks: contributionLinksReducer,
});

export default rootReducer;
