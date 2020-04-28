import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../../styles/Styles';
import { TASK_TYPE, ICONS } from '../../constants/Constants';
import { DriverContributionLinks, TaskLink } from '../Link';

const useStyles = makeStyles(styles);

export const MapPanel = () => {
  const classes = useStyles();
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className={classes.mapContent}>
      {tasks
        .filter((task) => task.type === TASK_TYPE.DRIVER)
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
