import React from 'react';
import { useSelector } from 'react-redux';
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

  return (
    <div className={classes.taskListContainer}>
      <Hint id={HINT_IDS.HINTS} className={classes.taskListHint} />
      {getHint()}
      <FilterSummary variant={variant.taskList} />
      {taskSummaries.map((taskSummary) => (
        <div key={taskSummary.id} className={classes.taskListEntry}>
          <TaskSummary taskSummary={taskSummary} />
        </div>
      ))}
    </div>
  );
};
