import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import TaskResult from './TaskResult';
import { findTasks } from '../actions/Tasks';

import getVisibleTasks from '../selectors/TaskSelector';

const TaskList = () => {
  const tasks = useSelector(getVisibleTasks);
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.searchTerm);

  useEffect(() => {
    dispatch(findTasks(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <List>
      <ListItem key="numResults">
        <Typography variant="subtitle1">{tasks.length} tasks</Typography>
      </ListItem>
      {tasks.map(task => (
        <ListItem key={task.id}>{TaskResult(task)}</ListItem>
      ))}
    </List>
  );
};

export default TaskList;
