import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
} from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UPDATE_STATUS, URLS, DEFAULT_TAB } from '../../constants/Constants';
import { ShowTask } from './ShowTask';
import { EditTask } from './EditTask';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { GeneralError } from '../GeneralError';
import { formatUserName } from '../../util/Users';

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

  const onExitTask = () => {
    dispatch(setCurrentTab(DEFAULT_TAB));
    history.push(`/${URLS.BROWSE}/`);
  };

  const NewTaskDialog = () => {
    const [type, setType] = useState('INITIATIVE');

    return (
      <Dialog
        open={true}
        onClose={onExitTask}
        aria-labelledby="alert-dialog-newTask"
        aria-describedby="alert-dialog-newTask-description"
      >
        <DialogTitle id="alert-dialog-title">Create New Task</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              aria-label="type"
              name="type1"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <FormControlLabel value="INITIATIVE" control={<Radio />} label="Initiative" />
              <FormControlLabel value="ENABLER" control={<Radio />} label="Enabler" />
              <FormControlLabel value="DRIVER" control={<Radio />} label="Driver" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onExitTask}>CANCEL</Button>
          <Button
            onClick={() => {
              setTask({
                editors: [currentUser.id],
                editorNames: [{ id: currentUser.id, userName: formatUserName(currentUser) }],
                type,
              });
              setEdit('edit');
              setUpdateStatus(UPDATE_STATUS.UPDATED);
            }}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const body = () => (
    <div style={{ marginBottom: edit === 'edit' ? '100px' : 0 }}>
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
              setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
            }
            setEdit('read');
          }}
          onNewTask={(newTask) => {
            setEdit('read');
            history.push(`/${URLS.TASK}/${newTask.id}`);
          }}
          onExitTask={onExitTask}
          onError={(error) => {
            setErrorMsg(error);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }}
        />
      ) : (
        <ShowTask
          task={task}
          onChangedVacancy={() => setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE)}
          onErrorChangingVacancy={(e) => {
            setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }}
        />
      )}
    </div>
  );

  switch (updateStatus) {
    case UPDATE_STATUS.NEW:
      return <NewTaskDialog />;
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
