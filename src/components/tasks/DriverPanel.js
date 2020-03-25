import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Styles';
import HeaderBlock from '../fragments/HeaderBlock';
import TagsAndLinksBlock from '../fragments/TagsAndLinksBlock';
import { ContributionsBlock } from '../fragments/Contributions';

const useStyles = makeStyles(theme => styles(theme));

const DriverPanel = ({ driver }) => {
  const classes = useStyles();

  return (
    <div className={classes.fullWidthContent}>
      <HeaderBlock task={driver} />
      <br />
      <Typography variant="h6">Enabled By</Typography>
      <ContributionsBlock contributions={driver.contributions} />
      <br />
      <TagsAndLinksBlock task={driver} />
    </div>
  );
};

export default DriverPanel;
