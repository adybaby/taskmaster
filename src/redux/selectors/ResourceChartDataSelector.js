/* eslint-disable no-restricted-globals */
import { createSelector } from 'reselect';
import { buildChartData } from '../../data/charts/ResourceChartDateBuilder';

const getTasks = (state) => state.tasks;
const getUsers = (state) => state.users;
const getDateRange = (state) => state.dateRange;
const getChartFilterControls = (state) => state.chartFilterControls;
const getSkills = (state) => state.skills;
// const getVisibleTask = useSelector(getVisibleTasks);

export const calculateResourceChartData = createSelector(
  [getTasks, getUsers, getDateRange, getSkills, getChartFilterControls],
  (tasks, users, dateRange, skills, chartFilterControls) => {
    const activeFilter = chartFilterControls[0].options.find(
      (option) => option.id === chartFilterControls[0].selectedId
    );
    const data = { ...buildChartData(tasks, users, dateRange, skills, activeFilter.params) };
    return data;
  }
);
