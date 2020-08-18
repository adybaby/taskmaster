import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UPDATE_STATUS } from '../../constants/Constants';
import { ShowTask } from './ShowTask';
import { EditTask } from './EditTask';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { GeneralError } from '../GeneralError';

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

export const Task = ({ newTask }) => {
  const classes = useStyles()();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();
  const currentUser = useSelector((state) => state.currentUser);
  const [edit, setEdit] = useState('read');

  useEffect(() => {
    dispatch(setCurrentTab(null));
  }, [dispatch]);

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [id]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      if (newTask != null) {
        setUpdateStatus(UPDATE_STATUS.UPDATING);
        setTask(newTask);
        setUpdateStatus(UPDATE_STATUS.UPDATED);
      } else {
        setUpdateStatus(UPDATE_STATUS.UPDATING);
        db.getFullTask(id)
          .then((retrievedTask) => {
            if (isMountedRef.current) {
              setTask(retrievedTask);
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
    }
  }, [id, task, newTask, updateStatus, isMountedRef]);

  const onTabChange = (event, value) => {
    setEdit(value);
  };

  const body = () => (
    <>
      {task.editors.includes(currentUser.id) ? (
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
              console.log('Seeting update to needs');
              setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
            }
            setEdit('read');
          }}
        />
      ) : (
        <ShowTask
          task={task}
          onChangedVacancy={() => setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE)}
          onErrorChangingVacancy={(e) => {
            e.setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
          }}
        />
      )}
    </>
  );

  switch (updateStatus) {
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
      return (
        <GeneralError
          errorMsg="There was an error displaying the task"
          errorDetailsMsg={errorMsg}
        />
      );
    default:
      return null;
  }
};
