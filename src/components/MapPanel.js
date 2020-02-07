import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { makeMap } from '../data/DataInterface';
import styles from '../styles/Styles';
import { PrioritiesList, PrioritiesLink } from './taskpanels/PrioritiesBlock';

const useStyles = makeStyles(theme => styles(theme));

const MapPanel = () => {
  const classes = useStyles();
  const [map, setMap] = useState(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (map === null) {
      makeMap().then(mapData => {
        if (didMount) setMap(mapData);
      });
    }
  }, [map, didMount]);

  return (
    <div className={classes.taskPanel}>
      {map !== null
        ? map.map(mapEntry => (
            <div key={mapEntry.driver.id} className={classes.taskPanel}>
              <Typography variant="h5">
                <RouterLink to={`/task/${mapEntry.driver.id}`}>{mapEntry.driver.title} </RouterLink>
              </Typography>
              <div className={classes.taskPanel}>
                {mapEntry.contributees.map(driverContributor => (
                  <div key={driverContributor.contribution.task.id}>
                    <Typography variant="h6">
                      <PrioritiesLink
                        id={driverContributor.contribution.task.id}
                        title={driverContributor.contribution.task.title}
                        priority={driverContributor.contribution.contribution}
                      />
                    </Typography>
                    <div className={classes.taskPanel}>
                      <PrioritiesList
                        contributeesAndTheirContribution={driverContributor.contributees}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default MapPanel;
