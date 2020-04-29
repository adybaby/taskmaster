/* eslint-disable no-nested-ternary */
import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { Typography, Divider } from '@material-ui/core';
import { formatDate } from '../../util/Dates';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UserLink, TaskLink, SkillLink } from '../Link';

const variant = typographyVariant.inspector;

export const Inspector = ({ dayRefData, skillTitle, total, daySummary }) => {
  const classes = useStyles();

  const makeBlock = (title, data, showCount, showUser, taskField, datesType, datesField) => (
    <>
      <div className={classes.inspectorSectionHeading}>
        <Typography variant={variant.title}>
          <b>{title}</b>
        </Typography>
      </div>
      {data.length > 0 ? (
        data.map((elem, index) => (
          <div className={classes.inspectorInteriorBlock} key={index}>
            <div>
              {showCount ? (
                <>
                  <Typography style={{ display: 'inline-block' }} variant={variant.body}>
                    {elem.count} x {skillTitle}
                    {'\u00A0'}required{'\u00A0'}
                  </Typography>
                </>
              ) : null}
              {showUser ? (
                <>
                  <UserLink userId={elem.user.id} variant={variant.body} />
                  {'\u00A0'}as{'\u00A0'}
                  <SkillLink skill={skillTitle} variant={variant.body} />
                  {'\u00A0'}
                </>
              ) : null}
              {taskField !== null ? (
                <>
                  <Typography style={{ display: 'inline-block' }} variant={variant.body}>
                    for{'\u00A0'}
                  </Typography>
                  <TaskLink task={elem[taskField]} variant={variant.body} />
                </>
              ) : null}
            </div>
            {Array.isArray(elem[datesType][datesField])
              ? elem[datesType][datesField].map((period, i) => (
                  <div key={i}>
                    <Typography variant={variant.date}>
                      <i>
                        {formatDate(period.from)}
                        {'\u00A0'}
                        to
                        {'\u00A0'}
                        {formatDate(period.to)}
                      </i>
                    </Typography>
                  </div>
                ))
              : null}
          </div>
        ))
      ) : (
        <div className={classes.inspectorInteriorBlock}>
          <Typography variant={variant.body}>None</Typography>
        </div>
      )}
    </>
  );

  return (
    <div className={classes.inspectorLayoutContainer}>
      <div className={`${classes.inspectorDaySummary} ${classes.inspectorInteriorSection}`}>
        <Typography variant={variant.title}>
          <b>{daySummary(total, skillTitle, formatDate(new Date(dayRefData.x)))}</b>
        </Typography>
      </div>
      <div className={classes.inspectorInteriorSection}>
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
      <div className={classes.inspectorInteriorSection}>
        {makeBlock('Initiatives', dayRefData.vacancies, true, false, 'task', 'vacancy', 'periods')}
      </div>
      <Divider />
      <div className={classes.inspectorInteriorSection}>
        {makeBlock('Signs Ups', dayRefData.signUps, false, true, 'signUp', 'signUp', 'periods')}
      </div>
    </div>
  );
};
