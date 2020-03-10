import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as TASK_TYPES from '../../constants/TaskTypes';
import DriverPanel from './DriverPanel';
import EnablerPanel from './EnablerPanel';
import InitiativePanel from './InitiativePanel';

const TaskPanel = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (task === null || task.id !== id) {
      setTask(tasks.filter(tsk => tsk.id === id)[0]);
    }
  }, [dispatch, id, task, tasks]);

  const RawFields = () => (
    <div>
      Could not process fields in item:
      {Object.entries(task).map(field => (
        <div key={task.id + field[0]}>
          <Typography>{`${field[0]}: ${field[1]}`}</Typography>
        </div>
      ))}
    </div>
  );

  if (task === null) return null;

  switch (task.type) {
    case TASK_TYPES.DRIVER:
      return <DriverPanel driver={task} />;
    case TASK_TYPES.ENABLER:
      return <EnablerPanel enabler={task} />;
    case TASK_TYPES.INITIATIVE:
      return <InitiativePanel initiative={task} />;
    default:
      return <RawFields />;
  }
};

export default TaskPanel;
