/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { findEnablersPriorities } from '../../data/DataInterface';
import styles from '../../styles/Styles';
import HeaderBlock from './HeaderBlock';
import TagsAndLinksBlock from './TagsAndLinksBlock';
import { PrioritiesBlock } from './PrioritiesBlock';

const useStyles = makeStyles(theme => styles(theme));

const DriverPanel = ({ driver }) => {
  const classes = useStyles();
  const [enablersPriorities, setEnablersPriorities] = useState(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (enablersPriorities === null) {
      findEnablersPriorities(driver).then(results => {
        if (didMount) setEnablersPriorities(results);
      });
    }
  }, [driver, enablersPriorities, didMount]);

  return (
    <div className={classes.taskPanel}>
      <HeaderBlock task={driver} />

      <div className={classes.taskBody}>
        <Typography variant="h6">Enabled By</Typography>
        {enablersPriorities !== null ? <PrioritiesBlock priorities={enablersPriorities} /> : null}
      </div>

      <TagsAndLinksBlock task={driver} />
    </div>
  );
};

export default DriverPanel;
