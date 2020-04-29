import React from 'react';
import { useSelector } from 'react-redux';
import { TaskResult } from './TaskResult';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { FilterSummary } from '../filters/FilterSummary';

const variant = typographyVariant.taskList;

export const TaskList = () => {
  const classes = useStyles();
  const tasks = useSelector(getVisibleTasks);

  return (
    <div className={classes.taskListContainer}>
      <FilterSummary variant={variant.taskList} />
      {tasks.map((task) => (
        <div key={task.id} className={classes.taskListEntry}>
          <TaskResult task={task} />
        </div>
      ))}
    </div>
  );
};
