import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';
import getVisibleTasks from '../selectors/TaskSelector';
import { findTasks } from '../actions/Tasks';

const TaskList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTasks());
  }, [dispatch]);

  const tasks = useSelector(getVisibleTasks);

  return (
    <List>
      <ListItem key="numResults">
        {' '}
        <Typography variant="subtitle1">{tasks.length} tasks</Typography>
      </ListItem>
      {tasks.map((task, index) => (
        <ListItem key={index}>{Task(task)}</ListItem>
      ))}
    </List>
  );
};

export default TaskList;
