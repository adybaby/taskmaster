import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findTask } from '../../data/DataInterface';
import * as STATUS from '../../constants/TaskStatus';
import * as TASK_TYPES from '../../constants/TaskTypes';
import DriverPanel from './DriverPanel';
import EnablerPanel from './EnablerPanel';
import InitiativePanel from './InitiativePanel';
import { setSearchTerm, clearTaskFilters } from '../../actions/Tasks';

const TaskPanel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(STATUS.NOT_INITIALISED);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    setTaskStatus(STATUS.SEARCHING);

    findTask(id)
      .then(result => {
        setTask(result);
        if (typeof result === 'undefined' || result === null) {
          setTaskStatus(STATUS.NO_RESULTS);
        } else {
          setTaskStatus(STATUS.HAVE_RESULTS);
        }
      })
      .catch(e => {
        setError(e);
        setTaskStatus(STATUS.ERROR);
      });
  }, [dispatch, id]);

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

  const Panel = () => {
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

  switch (taskStatus) {
    case STATUS.NO_RESULTS:
      return 'Not Found';
    case STATUS.ERROR:
      return `Error: ${error}`;
    case STATUS.HAVE_RESULTS:
      return <Panel />;
    default:
      return 'One moment..';
  }
};

export default TaskPanel;
