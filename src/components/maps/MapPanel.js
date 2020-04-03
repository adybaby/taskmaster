import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/Styles';
import { ContributionsDeepList } from '../fragments/Contributions';
import * as TYPES from '../../data/fields/Type';

const useStyles = makeStyles(styles);

export const MapPanel = () => {
  const classes = useStyles();
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className={classes.fullWidthContent}>
      {tasks
        .filter((task) => task.type === TYPES.DRIVER)
        .map((driver) => (
          <div key={driver.id}>
            <Typography variant="h5">
              <Link className={classes.link} to={`/task/${driver.id}`}>
                {driver.title}{' '}
              </Link>
            </Typography>
            <div className={classes.fullWidthContent}>
              <ContributionsDeepList contributions={driver.contributions} />
            </div>
          </div>
        ))}
    </div>
  );
};
