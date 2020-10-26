import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDateRange } from '../../util/Dates';
import { UserLink, TaskLink } from '../Link';

const variant = typographyVariant.inspector;

export const Inspector = ({ total, skillId, skillStr, dateStr, chartTitle, participants }) => {
  const classes = useStyles()();

  return (
    <div className={classes.inspectorLayoutContainer}>
      <div className={`${classes.inspectorDaySummary} ${classes.inspectorInteriorSection}`}>
        <Typography variant={variant.title}>
          <b>
            Total {skillStr} {chartTitle} on {dateStr}: {total}
          </b>
        </Typography>
      </div>
      <div className={classes.inspectorInteriorSection}>
        {participants
          .filter((p) => p.skills.find((skill) => skill.id === skillId) != null)
          .map((p, key) => (
            <div className={classes.inspectorLine} key={key}>
              {p.userId == null ? null : (
                <UserLink userId={p.userId} userName={p.userName} variant={variant.body} />
              )}
              {p.userId != null && p.taskId != null ? (
                <Typography style={{ display: 'inline-block' }} variant={variant.body}>
                  {'\u00A0'}signed up for{'\u00A0'}
                </Typography>
              ) : null}
              {p.taskId == null ? null : (
                <TaskLink taskId={p.taskId} taskTitle={p.taskTitle} variant={variant.body} />
              )}
              <Typography style={{ display: 'inline-block' }} variant={variant.body}>
                {'\u00A0'}
                {formatDateRange(p)}
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};
