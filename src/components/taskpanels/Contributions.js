import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { displayNameForLevel } from '../../constants/Contributions';
import styles from '../../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));

export const ContributionLink = ({ contribution }) => (
  <div>
    <RouterLink to={`/task/${contribution.id}`}>{contribution.title}</RouterLink>
    {` (${displayNameForLevel(contribution.level)})`}
  </div>
);

export const ContributionsBlock = ({ contributions }) =>
  contributions.map(contribution => (
    <ContributionLink key={contribution.id} contribution={contribution} />
  ));

export const ContributionsList = ({ contributions }) =>
  contributions.map(contribution => (
    <div key={contribution.id}>
      <ContributionLink contribution={contribution} />
    </div>
  ));

export const ContributionsDeepList = ({ contributions }) => {
  const classes = useStyles();
  return contributions.map(contribution => (
    <div key={contribution.id}>
      <Typography variant="h6">
        <ContributionLink contribution={contribution} />
      </Typography>
      <div className={classes.taskPanel}>
        <ContributionsList contributions={contribution.contributions} />
      </div>
    </div>
  ));
};