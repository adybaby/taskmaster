import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from '../../styles/Styles';
import { DriverContributionLinks } from '../Link';
import { Hint, HINT_IDS } from '../hints/Hint';
import * as db from '../../db/Db';
import * as logger from '../../util/Logger';
import { UPDATE_STATUS } from '../../constants/Constants';
import { GeneralError } from '../GeneralError';

export const MapPanel = () => {
  const classes = useStyles()();

  const [tasks, setTasks] = useState(null);
  const [mounted, setMounted] = useState(false);
  const taskSummaries = useSelector((state) => state.taskSummaries);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(
    () => () => {
      setMounted(false);
    },
    []
  );

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [taskSummaries]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE && mounted) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      db.getMap()
        .then((map) => {
          if (mounted) {
            setTasks(map);
            setUpdateStatus(UPDATE_STATUS.UPDATED);
          }
        })
        .catch((e) => {
          logger.error(e);
          if (mounted) {
            setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }
        });
    }
  }, [updateStatus, tasks, mounted]);

  switch (updateStatus) {
    case UPDATE_STATUS.UPDATING:
      return <div className={classes.mapContent}>Retrieving tasks from database..</div>;

    case UPDATE_STATUS.UPDATED:
      return (
        <div className={classes.mapContent}>
          <Hint id={HINT_IDS.MAPS} className={classes.mapHint} />
          {tasks
            .filter((task) => task.type === 'DRIVER')
            .map((task, index) => (
              <DriverContributionLinks key={index} task={task} />
            ))}
        </div>
      );
    case UPDATE_STATUS.ERROR:
      return (
        <GeneralError
          errorMsg="There was a problem retrieving the task map from the database."
          errorDetailsMsg={errorMsg}
        />
      );

    default:
      return null;
  }
};
