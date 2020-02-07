import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { findDriverContributeesAndTheirContribution } from '../../data/DataInterface';
import styles from '../../styles/Styles';
import HeaderBlock from './HeaderBlock';
import TagsAndLinksBlock from './TagsAndLinksBlock';
import { PrioritiesBlock } from './PrioritiesBlock';

const useStyles = makeStyles(theme => styles(theme));

const DriverPanel = ({ driver }) => {
  const classes = useStyles();
  const [contributeesAndTheirContribution, setContributeesAndTheirContribution] = useState(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (contributeesAndTheirContribution === null) {
      findDriverContributeesAndTheirContribution(driver).then(results => {
        if (didMount) setContributeesAndTheirContribution(results);
      });
    }
  }, [driver, contributeesAndTheirContribution, didMount]);

  return (
    <div className={classes.taskPanel}>
      <HeaderBlock task={driver} />

      <div className={classes.taskBody}>
        <Typography variant="h6">Enabled By</Typography>
        {contributeesAndTheirContribution !== null ? (
          <PrioritiesBlock contributeesAndTheirContribution={contributeesAndTheirContribution} />
        ) : null}
      </div>

      <TagsAndLinksBlock task={driver} />
    </div>
  );
};

export default DriverPanel;
