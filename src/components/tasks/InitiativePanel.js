import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/Styles';
import HeaderBlock from '../fragments/HeaderBlock';
import TagsAndLinksBlock from '../fragments/TagsAndLinksBlock';
import { ContributionLink } from '../fragments/Contributions';
import { plannedDates } from '../../util/Dates';
import { VacancyBlock } from '../fragments/Vacancies';

const useStyles = makeStyles(theme => styles(theme));

const InitiativePanel = ({ initiative }) => {
  const classes = useStyles();

  return (
    <div className={classes.fullWidthContent}>
      <HeaderBlock task={initiative} />
      <br />
      <Typography variant="h6">Planned Dates</Typography>
      <Typography variant="body1">
        {plannedDates(initiative.startDate, initiative.endDate)}
      </Typography>
      <br />

      <Typography variant="h6">Hypotheses</Typography>
      <Typography variant="body1">{initiative.hypotheses}</Typography>
      <br />

      <Typography variant="h6">Successful If</Typography>
      <Typography variant="body1">{initiative.successfulIf}</Typography>
      <br />

      <Typography variant="h6">Approach</Typography>
      <Typography variant="body1">{initiative.approach}</Typography>
      <br />

      <Typography variant="h6">Contributes to</Typography>
      {initiative.contributesTo.map(contributesTo => (
        <ContributionLink key={contributesTo.id} contribution={contributesTo} />
      ))}
      <br />

      <Typography variant="h6">Vacancies</Typography>
      <VacancyBlock vacancies={initiative.vacancies} />

      <TagsAndLinksBlock task={initiative} />
    </div>
  );
};

export default InitiativePanel;
