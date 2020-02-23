import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useSelector } from 'react-redux';
import TaskResult from './TaskResult';
import getVisibleTasks from '../../selectors/TaskSelector';

const TaskList = () => {
  const tasks = useSelector(getVisibleTasks);

  return (
    <List>
      <ListItem key="numResults">
        <Typography variant="subtitle1">{tasks.length} tasks</Typography>
      </ListItem>
      {tasks.map(task => (
        <ListItem key={task.id}>
          <TaskResult task={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
