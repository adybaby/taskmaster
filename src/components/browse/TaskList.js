import React from 'react';
import { useSelector } from 'react-redux';
import { TaskResult } from './TaskResult';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { FilterSummary } from '../filters/FilterSummary';
import { Hint, HINT_IDS } from '../hints/Hint';

const variant = typographyVariant.taskList;

export const TaskList = () => {
  const classes = useStyles()();
  const tasks = useSelector(getVisibleTasks);

  return (
    <div className={classes.taskListContainer}>
      <Hint id={HINT_IDS.INTRO} />
      <FilterSummary variant={variant.taskList} />
      {tasks.map((task) => (
        <div key={task.id} className={classes.taskListEntry}>
          <TaskResult task={task} />
        </div>
      ))}
    </div>
  );
};
