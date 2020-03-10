import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Styles';
import HeaderBlock from '../fragments/HeaderBlock';
import TagsAndLinksBlock from '../fragments/TagsAndLinksBlock';
import { ContributionsBlock, ContributionsList } from '../fragments/Contributions';

const useStyles = makeStyles(theme => styles(theme));

const EnablerPanel = ({ enabler }) => {
  const classes = useStyles();

  return (
    <div className={classes.outerPanel}>
      <HeaderBlock task={enabler} />
      <br />
      <Typography variant="h6">Enables</Typography>
      <ContributionsList contributions={enabler.contributesTo} />
      <br />
      <Typography variant="h6">Related Initiatives</Typography>
      <ContributionsBlock contributions={enabler.contributions} />
      <br />
      <TagsAndLinksBlock task={enabler} />
    </div>
  );
};

export default EnablerPanel;
