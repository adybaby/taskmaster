/* eslint-disable no-nested-ternary */
import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../util/Dates';
import { styles } from '../../styles/Styles';
import { VacancyDates } from '../fragments/Vacancies';
import * as URLS from '../../Urls';

const useStyles = makeStyles((theme) => styles(theme));

export const MarkPanel = ({ dayRefData, skillTitle, total, totalsTitle }) => {
  const classes = useStyles();

  const makeBlock = (title, data, showCount, showUser, taskField, datesType, datesField) => (
    <>
      <Typography variant="body2">
        <b>{title}</b>
      </Typography>

      {data.length > 0 ? (
        data.map((elem, index) => (
          <div className={classes.topPadding} key={index}>
            <Typography variant="body2">
              {showCount ? (
                <>
                  {elem.count} {skillTitle} required for{' '}
                </>
              ) : null}

              {showUser ? (
                <>
                  <RouterLink to={`/${URLS.PROFILE}/${elem.user.id}`}>{elem.user.name}</RouterLink>
                  {` (as ${skillTitle}) - `}
                </>
              ) : null}

              {taskField !== null ? (
                <RouterLink to={`/${URLS.TASK}/${elem[taskField].id}`}>
                  {elem[taskField].title}
                </RouterLink>
              ) : null}

              {Array.isArray(elem[datesType][datesField]) ? (
                <>
                  {` `}
                  <VacancyDates dates={elem[datesType][datesField]} noUser={true} />
                </>
              ) : null}
            </Typography>
          </div>
        ))
      ) : (
        <Typography variant="body2">None</Typography>
      )}
    </>
  );

  let displayTotal = total;
  let displayTitle = totalsTitle;
  if (total < 0) {
    displayTotal = Math.abs(total);
    displayTitle = 'Excess';
  }

  return (
    <>
      <Typography variant="subtitle1" className={classes.padding}>
        {skillTitle} ({displayTotal} {displayTitle})
      </Typography>
      <Divider />
      <Typography variant="subtitle2" className={classes.padding}>
        {formatDate(new Date(dayRefData.x))}
      </Typography>
      <Divider />
      <div className={classes.padding}>
        {makeBlock(
          'Stated Availability (before Sign-Ups)',
          dayRefData.stated,
          false,
          true,
          null,
          'user',
          'available'
        )}
      </div>
      <Divider />
      <div className={classes.padding}>
        {makeBlock('Initiatives', dayRefData.vacancies, true, false, 'task', 'vacancy', 'date')}
      </div>
      <Divider />
      <div className={classes.padding}>
        {makeBlock('Signs Ups', dayRefData.signUps, false, true, 'signUp', 'signUp', 'periods')}
      </div>
    </>
  );
};
