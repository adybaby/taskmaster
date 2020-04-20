import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/Styles';
import { DriverContributionLinks, TaskLink } from '../Link';
import * as TYPES from '../../data/fields/Type';
import * as ICONS from '../../Icons';

const useStyles = makeStyles(styles);

export const MapPanel = () => {
  const classes = useStyles();
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className={classes.mapContent}>
      {tasks
        .filter((task) => task.type === TYPES.DRIVER)
        .map((task) => (
          <div key={task.id}>
            <div className={classes.mapDriverTitle}>
              <TaskLink task={task} taskIcon={ICONS.DRIVER} variant="h5" />
            </div>
            <DriverContributionLinks task={task} />
          </div>
        ))}
    </div>
  );
};
