import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useStyles } from '../../styles/Styles';
import { DriverContributionLinks } from '../Link';
import { Hint, HINT_IDS } from '../hints/Hint';
import * as db from '../../db/Db';
import * as logger from '../../util/Logger';
import { UPDATE_STATUS } from '../../constants/Constants';
import { GeneralError } from '../GeneralError';

const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
};

export const MapPanel = () => {
  const classes = useStyles()();
  const { enqueueSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState(null);
  const [workingTasks, setWorkingTasks] = useState(null);
  const taskSummaries = useSelector((state) => state.taskSummaries);
  const currentUser = useSelector((state) => state.currentUser);
  const canPrioritise = currentUser.permissions.includes('upsertDrivers');
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [taskSummaries]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      db.getMap()
        .then((map) => {
          if (isMountedRef.current) {
            const orderedTasks = map.sort((a, b) => b.score - a.score);
            setTasks(orderedTasks);
            setWorkingTasks([...orderedTasks]);
            setUpdateStatus(UPDATE_STATUS.UPDATED);
          }
        })
        .catch((e) => {
          logger.error(e);
          if (isMountedRef.current) {
            setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }
        });
    }
  }, [updateStatus, tasks, isMountedRef]);

  const swapWorkingTasks = (i, j) => {
    const swappedTasks = [...workingTasks];
    swappedTasks[i] = workingTasks[j];
    swappedTasks[j] = workingTasks[i];
    setWorkingTasks(swappedTasks);
  };

  const increasePriority = (task) => {
    const index = workingTasks.findIndex((workingTask) => workingTask.id === task.id);
    swapWorkingTasks(index, index - 1);
  };

  const decreasePriority = (task) => {
    const index = workingTasks.findIndex((workingTask) => workingTask.id === task.id);
    swapWorkingTasks(index, index + 1);
  };

  const onConfirmChanges = () => {
    const edits = [];

    for (let index = 0; index < workingTasks.length; index++) {
      if (workingTasks[index].id !== tasks[index].id) {
        edits.push({ id: workingTasks[index].id, score: workingTasks.length - index });
      }
    }
    db.updateTaskPriorities(edits)
      .then(() => {
        setTasks(workingTasks);
        enqueueSnackbar('Successfully re-prioritised tasks.', { variant: 'success' });
      })
      .catch((e) => {
        setErrorMsg(e);
        setUpdateStatus(UPDATE_STATUS.ERROR);
      });
  };

  const hasChanged = () => {
    for (let index = 0; index < tasks.length - 1; index++) {
      if (tasks[index].id !== workingTasks[index].id) {
        return true;
      }
    }
    return false;
  };

  const makeFooter = () => (
    <div zindex="9999" className={`${classes.formFooter} ${hasChanged() ? 'open' : undefined}`}>
      <div className={classes.formEditedMessageDiv}>
        <Typography className={classes.formEditedMessage}>
          Your changes will not be saved until you confirm them
        </Typography>
      </div>
      <Button
        style={{ color: 'lightGrey' }}
        onClick={() => {
          setWorkingTasks([...tasks]);
        }}
      >
        CANCEL CHANGES
      </Button>
      <Button style={{ color: 'white' }} onClick={onConfirmChanges}>
        <b>CONFIRM CHANGES</b>
      </Button>
    </div>
  );

  switch (updateStatus) {
    case UPDATE_STATUS.UPDATING:
      return <div className={classes.mapContent}>Retrieving tasks from database..</div>;

    case UPDATE_STATUS.UPDATED:
      return (
        <div className={classes.mapContent}>
          <Hint id={HINT_IDS.MAPS} className={classes.mapHint} />
          {workingTasks.map((task, index) => (
            <DriverContributionLinks
              key={index}
              task={task}
              canPrioritise={canPrioritise}
              increasePriority={index === 0 ? null : increasePriority}
              decreasePriority={index === tasks.length - 1 ? null : decreasePriority}
            />
          ))}
          {makeFooter()}
        </div>
      );
    case UPDATE_STATUS.ERROR:
      return <GeneralError errorMsg="There was a problem." errorDetailsMsg={errorMsg} />;

    default:
      return null;
  }
};
