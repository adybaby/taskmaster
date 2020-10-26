import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Divider } from '@material-ui/core';
import { TaskSummary } from './TaskSummary';
import { getVisibleTaskSummaries } from '../../state/selectors/TaskListSelector';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { FilterSummary } from '../filters/FilterSummary';
import { Hint, HINT_IDS } from '../hints/Hint';
import { TABS } from '../../constants/Constants';

const variant = typographyVariant.taskList;

export const TaskSummaries = () => {
  const classes = useStyles()();
  const taskSummaries = useSelector(getVisibleTaskSummaries);
  const currentTab = useSelector((state) => state.currentTab);
  const sortParam = useSelector((state) => state.filterParams).find(
    (filterParam) => filterParam.id === 'sort'
  );
  const sortParamValue = sortParam == null ? 'priority' : sortParam.params[0];
  const groupTypes =
    (sortParamValue === 'priority' || sortParamValue === 'priority_reverse') &&
    currentTab === TABS.all;

  const getHint = () => {
    switch (currentTab) {
      case TABS.all:
        return <Hint id={HINT_IDS.INTRO} className={classes.taskListHint} />;
      case TABS.drivers:
        return <Hint id={HINT_IDS.DRIVERS} className={classes.taskListHint} />;
      case TABS.enablers:
        return <Hint id={HINT_IDS.ENABLERS} className={classes.taskListHint} />;
      case TABS.initiatives:
        return <Hint id={HINT_IDS.INITIATIVES} className={classes.taskListHint} />;
      default:
        return null;
    }
  };

  const withHeaders = (tasks) => {
    if (!groupTypes) return tasks;

    const tasksWithHeaders = [...tasks];

    const insertHeader = (type, label) => {
      tasksWithHeaders.splice(
        tasksWithHeaders.findIndex((task) => task.type === type),
        0,
        { id: `_${type}_HEADER`, header: true, label }
      );
    };

    insertHeader('INITIATIVE', 'Initiatives');
    insertHeader('DRIVER', 'Drivers');
    insertHeader('ENABLER', 'Enablers');

    return tasksWithHeaders;
  };

  return (
    <div className={classes.taskListContainer}>
      <Hint id={HINT_IDS.HINTS} className={classes.taskListHint} />
      {getHint()}
      <FilterSummary variant={variant.taskList} />
      {withHeaders(taskSummaries).map((taskSummary) => (
        <div key={taskSummary.id} className={classes.taskListEntry}>
          {taskSummary.header ? (
            <>
              <Typography variant="h5">{taskSummary.label}</Typography>
              <Divider />
            </>
          ) : (
            <TaskSummary taskSummary={taskSummary} />
          )}
        </div>
      ))}
    </div>
  );
};
