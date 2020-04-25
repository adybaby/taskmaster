import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TaskResult } from './TaskResult';
import { getVisibleTasks } from '../../redux/selectors/TaskListSelector';
import { styles, typographyVariant } from '../../styles/Styles';
import { allFiltersSummary } from '../../data/filters/TaskListFilterControls';

const useStyles = makeStyles(styles);
const variant = typographyVariant.taskList;

export const TaskList = ({ activeFilters, currentTab }) => {
  const classes = useStyles();
  const tasks = useSelector(getVisibleTasks);

  return (
    <div className={classes.taskListContainer}>
      <div className={classes.taskListSummary}>
        <Typography variant={variant.taskList}>
          {allFiltersSummary(activeFilters, currentTab, tasks.length)}
        </Typography>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className={classes.taskListEntry}>
          <TaskResult task={task} />
        </div>
      ))}
    </div>
  );
};
