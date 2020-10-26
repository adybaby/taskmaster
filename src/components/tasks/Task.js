import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UPDATE_STATUS, URLS } from '../../constants/Constants';
import { ShowTask } from './ShowTask';
import { EditTask } from './EditTask';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { GeneralError } from '../GeneralError';
import { NewTaskDialog } from './NewTaskDialog';

const variant = typographyVariant.task;

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

export const Task = () => {
  const classes = useStyles()();
  const { id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();
  const currentUser = useSelector((state) => state.currentUser);
  const [edit, setEdit] = useState('read');

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [id]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      if (id == null) {
        setUpdateStatus(UPDATE_STATUS.NEW);
      } else {
        setUpdateStatus(UPDATE_STATUS.UPDATING);
        db.getFullTask(id)
          .then((retrievedTask) => {
            if (isMountedRef.current) {
              if (retrievedTask == null) {
                setErrorMsg(`Could not find a task with id "${id}"`);
                setUpdateStatus(UPDATE_STATUS.ERROR);
              } else {
                setTask(retrievedTask);
                setUpdateStatus(UPDATE_STATUS.UPDATED);
              }
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
    }
  }, [id, task, updateStatus, isMountedRef]);

  const onTabChange = (event, value) => {
    setEdit(value);
  };

  const handleExitTask = () => {
    history.push(`/${URLS.BROWSE}/`);
  };

  const handleNewTask = (newTask) => {
    setTask(newTask);
    setEdit('edit');
    setUpdateStatus(UPDATE_STATUS.UPDATED);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTask(updatedTask);
    setEdit('read');
    setUpdateStatus(UPDATE_STATUS.UPDATED);
  };

  const handleError = (error) => {
    setErrorMsg(error);
    setUpdateStatus(UPDATE_STATUS.ERROR);
  };

  const body = () => (
    <div style={{ marginBottom: edit === 'edit' ? '100px' : 0 }}>
      {task.editors.includes(currentUser.id) || currentUser.permissions.includes('admin') ? (
        <div className={classes.mainTabBar}>
          <Tabs value={edit} indicatorColor="primary" onChange={onTabChange}>
            <Tab value={'read'} className={classes.tab} label={<div>READ</div>} />
            <Tab value={'edit'} className={classes.tab} label={<div>EDIT</div>} />
          </Tabs>
        </div>
      ) : null}

      {edit === 'edit' ? (
        <EditTask
          task={task}
          onClose={(updatedTask) => {
            if (updatedTask != null) {
              setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
            }
            setEdit('read');
          }}
          onCreatedTask={(newTask) => {
            setEdit('read');
            history.push(`/${URLS.TASK}/${newTask.id}`);
          }}
          onDeletedTask={handleExitTask}
          onUpdatedTask={handleTaskUpdated}
          onNewTaskCancelled={handleExitTask}
          onError={handleError}
          currentUser={currentUser}
        />
      ) : (
        <ShowTask
          task={task}
          onChangedVacancy={() => setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE)}
          onErrorChangingVacancy={handleError}
        />
      )}
    </div>
  );

  switch (updateStatus) {
    case UPDATE_STATUS.NEW:
      return (
        <NewTaskDialog
          currentUser={currentUser}
          onCancel={handleExitTask}
          onConfirm={handleNewTask}
        />
      );
    case UPDATE_STATUS.UPDATING:
      return (
        <div className={classes.taskHeading}>
          <Typography variant={variant.heading}>
            <b>Retrieving task from the database..</b>
          </Typography>
        </div>
      );
    case UPDATE_STATUS.UPDATED:
      return body();
    case UPDATE_STATUS.ERROR:
      return <GeneralError errorMsg="There's a problem :(" errorDetailsMsg={errorMsg} />;
    default:
      return null;
  }
};
