import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/Styles';
import { TaskSelectFilter } from './TaskSelectFilter';
import { ChartSelectFilter } from './ChartSelectFilter';
import { SortControl } from './SortControl';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';
import { YEAR_SELECT_FILTER_ID } from '../../data/filters/controls/YearSelectFilterControl';
import { TABS } from '../browse/MainTabs';

const useStyles = makeStyles(styles);

export const FilterBar = ({ currentTab }) => {
  const classes = useStyles();
  const taskListFilterControls = useSelector((state) => state.taskListfilterControls);
  const chartFilterControls = useSelector((state) => state.chartFilterControls);
  const currentType = taskListFilterControls.find(
    (filterControl) => filterControl.id === TASK_FILTER_CONTROL_IDS.TYPE
  ).selectedId;
  const taskListTabs = [TABS.ALL, TABS.DRIVERS, TABS.ENABLERS, TABS.INITIATIVES];

  const taskListfilterIds = [
    TASK_FILTER_CONTROL_IDS.CREATED_DATE,
    TASK_FILTER_CONTROL_IDS.CREATED_BY,
    TASK_FILTER_CONTROL_IDS.START_DATE,
    TASK_FILTER_CONTROL_IDS.END_DATE,
    TASK_FILTER_CONTROL_IDS.VACANCIES,
  ];

  const getCurrentFilters = () => {
    if (currentTab === TABS.CHARTS)
      return (
        <ChartSelectFilter
          key={YEAR_SELECT_FILTER_ID}
          filterControl={chartFilterControls.find((fc) => fc.id === YEAR_SELECT_FILTER_ID)}
        />
      );

    if (taskListTabs.includes(currentTab))
      return (
        <>
          {taskListfilterIds.map((id) => {
            const filterControl = taskListFilterControls.find((fc) => fc.id === id);
            return typeof filterControl.forTaskTypes === 'undefined' ||
              filterControl.forTaskTypes.includes(currentTab.TASK_TYPE) ? (
              <TaskSelectFilter
                key={id}
                filterControl={taskListFilterControls.find((fc) => fc.id === id)}
              />
            ) : null;
          })}
          <SortControl currentTaskType={currentType} />;
        </>
      );

    return 'Error: Cannot find any filter controls for filter bar';
  };

  return <div className={classes.filterBar}>{getCurrentFilters()}</div>;
};
