import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { findTask } from '../data/DataInterface';
import * as STATUS from '../constants/TaskStatus';

const TaskPanel = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(STATUS.NOT_INITIALISED);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [id]);

  const panel = () => {
    switch (taskStatus) {
      case STATUS.NO_RESULTS:
        return 'Not Found';
      case STATUS.ERROR:
        return `Error: ${error}`;
      case STATUS.HAVE_RESULTS:
        return (
          <div>
            <div>
              {Object.entries(task).map(field => (
                <div key={task.id + field[0]}>
                  <Typography>{`${field[0]}: ${field[1]}`}</Typography>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return 'One moment..';
    }
  };

  return panel();
};

export default TaskPanel;
