import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import store from '../data/Store';
import styles from '../styles/Styles';
import { ContributionsDeepList } from './taskpanels/Contributions';
import * as TYPES from '../constants/TaskTypes';

const useStyles = makeStyles(theme => styles(theme));

const MapPanel = () => {
  const classes = useStyles();
  const { tasks } = store.getState();

  return (
    <div className={classes.taskPanel}>
      {tasks
        .filter(task => task.type === TYPES.DRIVER)
        .map(driver => (
          <div key={driver.id}>
            <Typography variant="h5">
              <RouterLink to={`/task/${driver.id}`}>{driver.title} </RouterLink>
            </Typography>
            <div className={classes.taskPanel}>
              <ContributionsDeepList contributions={driver.contributions} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MapPanel;
