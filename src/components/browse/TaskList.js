import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TaskResult } from './TaskResult';
import { getVisibleTasks } from '../../redux/selectors/TaskSelector';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const TaskList = () => {
  const classes = useStyles();
  const tasks = useSelector(getVisibleTasks);

  return (
    <div className={classes.fullWidthContent}>
      <Typography variant="subtitle1">{tasks.length} tasks</Typography>
      {tasks.map((task) => (
        <div key={task.id} className={classes.taskResult}>
          <TaskResult task={task} />
        </div>
      ))}
    </div>
  );
};
