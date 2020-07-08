import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from '../../styles/Styles';
import { DriverContributionLinks } from '../Link';
import { Hint, HINT_IDS } from '../hints/Hint';

export const MapPanel = () => {
  const classes = useStyles()();
  const tasks = useSelector((state) => state.tasks);

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
};
