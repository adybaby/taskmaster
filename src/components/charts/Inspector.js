/* eslint-disable no-nested-ternary */
import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { formatDate } from '../../util/Dates';
import { styles, typographyVariant } from '../../styles/Styles';
import { UserLink, TaskLink, SkillLink } from '../Link';

const useStyles = makeStyles(styles);
const variant = typographyVariant.inspector;

export const Inspector = ({ dayRefData, skillTitle, total, totalsTitle }) => {
  const classes = useStyles();

  const makeBlock = (title, data, showCount, showUser, taskField, datesType, datesField) => (
    <>
      <Typography variant={variant.Title}>
        <b>{title}</b>
      </Typography>

      {data.length > 0 ? (
        data.map((elem, index) => (
          <div className={classes.resourceMarkBlock} key={index}>
            <div>
              {showCount ? (
                <>
                  <Typography style={{ display: 'inline-block' }} variant={variant.Heading}>
                    {elem.count} x {skillTitle}
                    {'\u00A0'}required{'\u00A0'}
                  </Typography>
                </>
              ) : null}
              {showUser ? (
                <>
                  <UserLink userId={elem.user.id} variant={variant.Body} />
                  {'\u00A0'}as{'\u00A0'}
                  <SkillLink skill={skillTitle} variant={variant.Body} />
                </>
              ) : null}
              {taskField !== null ? (
                <>
                  {'\u00A0'}for{'\u00A0'}
                  <TaskLink task={elem[taskField]} variant={variant.Body} />
                </>
              ) : null}
            </div>
            {Array.isArray(elem[datesType][datesField])
              ? elem[datesType][datesField].map((period, i) => (
                  <div key={i}>
                    <Typography variant={variant.Note}>
                      {formatDate(period.from)}
                      {'\u00A0'}
                      <i>to</i>
                      {'\u00A0'}
                      {formatDate(period.to)}
                    </Typography>
                  </div>
                ))
              : null}
          </div>
        ))
      ) : (
        <Typography variant={variant.Body}>None</Typography>
      )}
    </>
  );

  let displayTotal = total;
  let displayTitle = displayTotal === 1 ? totalsTitle.singular : totalsTitle.plural;

  if (total < 0) {
    displayTotal = Math.abs(total);
    displayTitle = displayTotal === 1 ? totalsTitle.singularNegative : totalsTitle.pluralNegative;
  }

  return (
    <>
      <Typography variant={variant.Title} className={classes.resourceMarkSection}>
        {skillTitle} ({displayTotal} {displayTitle})
      </Typography>
      <Divider />
      <Typography variant={variant.Date} className={classes.resourceMarkSection}>
        {formatDate(new Date(dayRefData.x))}
      </Typography>
      <Divider />
      <div className={classes.resourceMarkSection}>
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
      <div className={classes.resourceMarkSection}>
        {makeBlock('Initiatives', dayRefData.vacancies, true, false, 'task', 'vacancy', 'periods')}
      </div>
      <Divider />
      <div className={classes.resourceMarkSection}>
        {makeBlock('Signs Ups', dayRefData.signUps, false, true, 'signUp', 'signUp', 'periods')}
      </div>
    </>
  );
};
