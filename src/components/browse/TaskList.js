import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TaskResult } from './TaskResult';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { styles, typographyVariant } from '../../styles/Styles';
import { FilterSummary } from '../filters/FilterSummary';

const useStyles = makeStyles(styles);
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
