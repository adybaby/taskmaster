import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Styles';
import HeaderBlock from './HeaderBlock';
import TagsAndLinksBlock from './TagsAndLinksBlock';
import { ContributionsBlock, ContributionsList } from './Contributions';

const useStyles = makeStyles(theme => styles(theme));

const EnablerPanel = ({ enabler }) => {
  const classes = useStyles();

  return (
    <div className={classes.taskPanel}>
      <HeaderBlock task={enabler} />

      <div className={classes.taskBody}>
        <Typography variant="h6">Enables</Typography>
        <ContributionsList contributions={enabler.contributesTo} />
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Related Initiatives</Typography>
        <ContributionsBlock contributions={enabler.contributions} />
      </div>

      <TagsAndLinksBlock task={enabler} />
    </div>
  );
};

export default EnablerPanel;
