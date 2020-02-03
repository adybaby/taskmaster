/* eslint-disable indent */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import HeaderBlock from './HeaderBlock';
import TagsAndLinksBlock from './TagsAndLinksBlock';
import { PrioritiesLink } from './PrioritiesBlock';
import {
  setSearchTerm,
  clearTaskFilters,
  setFilterBarVisible,
  setTaskFilter
} from '../../actions/Tasks';
import * as URLS from '../../constants/Urls';

const useStyles = makeStyles(theme => styles(theme));

const EnablerPanel = ({ initiative }) => {
  const dispatch = useDispatch();

  const handleVacancyClick = vacancy => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(true));
    dispatch(setTaskFilter({ type: 'vacancies', value: vacancy }));
  };

  const classes = useStyles();

  return (
    <div className={classes.taskPanel}>
      <HeaderBlock task={initiative} />

      <div className={classes.taskBody}>
        <Typography variant="h6">Hypotheses</Typography>
        <Typography variant="body1">{initiative.hypotheses}</Typography>
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Successful If</Typography>
        <Typography variant="body1">{initiative.successfulIf}</Typography>
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Approach</Typography>
        <Typography variant="body1">{initiative.approach}</Typography>
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Contributes to</Typography>
        {initiative.contributesTo.map(contributesTo => (
          <PrioritiesLink
            key={contributesTo.id}
            id={contributesTo.id}
            title={contributesTo.title}
            priority={contributesTo.priority}
          />
        ))}
      </div>

      <div className={classes.taskBody}>
        <Typography variant="h6">Vacancies</Typography>
        {initiative.vacancies.map(vacancy => (
          <div key={vacancy}>
            <Link
              style={{ marginRight: 5, textDecoration: 'underline' }}
              value={vacancy}
              component={RouterLink}
              to={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
              onClick={() => handleVacancyClick(vacancy)}
            >
              {vacancy}
            </Link>
            <Button value={vacancy}>SIGN UP!</Button>
          </div>
        ))}
      </div>

      <TagsAndLinksBlock task={initiative} />
    </div>
  );
};

export default EnablerPanel;
