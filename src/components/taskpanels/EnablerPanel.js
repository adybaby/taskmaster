/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { findInitiativesPriorities } from '../../data/DataInterface';
import styles from '../../styles/Styles';
import HeaderBlock from './HeaderBlock';
import TagsAndLinksBlock from './TagsAndLinksBlock';
import { PrioritiesBlock, PrioritiesLink } from './PrioritiesBlock';

const useStyles = makeStyles(theme => styles(theme));

const EnablerPanel = ({ enabler }) => {
  const [initiativesPriorities, setInitiativesPriorities] = useState(null);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (initiativesPriorities === null) {
      findInitiativesPriorities(enabler).then(results => {
        if (didMount) setInitiativesPriorities(results);
      });
    }
  }, [enabler, initiativesPriorities, didMount]);

  const classes = useStyles();

  return (
    <div className={classes.taskPanel}>
      <HeaderBlock task={enabler} />

      <div className={classes.taskBody}>
        <Typography variant="h6">Enables</Typography>
        {enabler.enables.map(enables => (
          <PrioritiesLink
            key={enables.id}
            id={enables.id}
            title={enables.title}
            priority={enables.priority}
          />
        ))}
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Related Initiatives</Typography>
        {initiativesPriorities !== null ? (
          <PrioritiesBlock priorities={initiativesPriorities} />
        ) : null}
      </div>

      <TagsAndLinksBlock task={enabler} />
    </div>
  );
};

export default EnablerPanel;
