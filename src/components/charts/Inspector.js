/* eslint-disable no-nested-ternary */
import React, { createElement } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { Typography, Divider } from '@material-ui/core';
import { formatDate } from '../../util/Dates';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UserLink, TaskLink, SkillLink } from '../Link';

const variant = typographyVariant.inspector;

export const Inspector = ({ inspectorData, skillTitle, total, daySummary }) => {
  const classes = useStyles()();

  const DateLine = ({ startDate, endDate }) => (
    <Typography variant={variant.date}>
      <i>
        {formatDate(startDate)}
        {'\u00A0'}
        to
        {'\u00A0'}
        {formatDate(endDate)}
      </i>
    </Typography>
  );

  const UserInSkillGroupForTaskLine = ({
    userId,
    userName,
    skillId,
    taskId,
    taskTitle,
    ...dates
  }) => (
    <div className={classes.inspectorLine}>
      <div>
        <UserLink userId={userId} userName={userName} variant={variant.body} />
        <Typography style={{ display: 'inline-block' }} variant={variant.body}>
          {'\u00A0'}in group{'\u00A0'}
        </Typography>
        <SkillLink skillId={skillId} skillTitle={skillTitle} variant={variant.body} />
        {typeof taskId !== 'undefined' ? (
          <>
            <Typography style={{ display: 'inline-block' }} variant={variant.body}>
              {'\u00A0'}for{'\u00A0'}
            </Typography>
            <TaskLink taskId={taskId} taskTitle={taskTitle} variant={variant.body} />
          </>
        ) : null}
      </div>
      <div>
        <DateLine {...dates} />
      </div>
    </div>
  );

  const RoleRequiredForTaskLine = ({ skillId, taskId, taskTitle, ...dates }) => (
    <div className={classes.inspectorLine}>
      <div>
        <SkillLink skillId={skillId} skillTitle={skillTitle} variant={variant.body} />
        <Typography style={{ display: 'inline-block' }} variant={variant.body}>
          {'\u00A0'}required for{'\u00A0'}
        </Typography>
        <TaskLink taskId={taskId} taskTitle={taskTitle} variant={variant.body} />
      </div>
      <div>
        <DateLine {...dates} />
      </div>
    </div>
  );

  const NoEntries = () => (
    <div className={classes.inspectorLine}>
      <Typography style={{ display: 'inline-block' }} variant={variant.body}>
        None
      </Typography>
    </div>
  );

  const InspectorSection = ({ title, lineElement, data }) => (
    <>
      <div className={classes.inspectorInteriorSection}>
        <div className={classes.inspectorSectionHeading}>
          <Typography variant={variant.title}>
            <b>{title}</b>
          </Typography>
        </div>
        {data.length === 0 ? (
          <NoEntries />
        ) : (
          data.map((dataItem, index) => createElement(lineElement, { key: index, ...dataItem }))
        )}
      </div>
      <Divider />
    </>
  );

  return (
    <div className={classes.inspectorLayoutContainer}>
      <div className={`${classes.inspectorDaySummary} ${classes.inspectorInteriorSection}`}>
        <Typography variant={variant.title}>
          <b>{daySummary(total, skillTitle, formatDate(new Date(inspectorData.x)))}</b>
        </Typography>
      </div>
      <InspectorSection
        title="Stated Availability (before Sign-Ups)"
        lineElement={UserInSkillGroupForTaskLine}
        data={inspectorData.availability}
      />
      <InspectorSection
        title="Vacancies"
        lineElement={RoleRequiredForTaskLine}
        data={inspectorData.vacancies}
      />
      <InspectorSection
        title="Sign Ups"
        lineElement={UserInSkillGroupForTaskLine}
        data={inspectorData.signedUp}
      />
    </div>
  );
};
