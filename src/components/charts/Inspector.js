/* eslint-disable no-nested-ternary */
import React, { createElement, Fragment } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { Typography, Divider } from '@material-ui/core';
import { formatDate, sameRange } from '../../util/Dates';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { UserLink, TaskLink } from '../Link';

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

  const AvailabilityLine = ({ userId, userName, skillId, taskId, taskTitle, ...dates }) => (
    <div className={classes.inspectorLine}>
      <div>
        <UserLink userId={userId} userName={userName} variant={variant.body} />
        {taskId != null ? (
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

  const VacanciesLine = ({ taskId, taskTitle, dates }) => (
    <div className={classes.inspectorLine}>
      <div>
        <TaskLink taskId={taskId} taskTitle={taskTitle} variant={variant.body} />
      </div>
      <div>
        {dates.map((dateRange, index) => (
          <Fragment key={index}>
            <DateLine key={index} {...dateRange} />
            {dateRange.count > 1 ? ` (${dateRange.count})` : ''}
          </Fragment>
        ))}
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

  const groupVacancies = (vacanciesData) => {
    const grouped = {};
    vacanciesData.forEach((data) => {
      const currentRange = { startDate: data.startDate, endDate: data.endDate };
      if (grouped[data.taskId] == null) {
        grouped[data.taskId] = {
          taskId: data.taskId,
          taskTitle: data.taskTitle,
          dates: [{ ...currentRange, count: 1 }],
        };
      } else {
        const matchingDate = grouped[data.taskId].dates.find((existingRange) =>
          sameRange(existingRange, currentRange)
        );
        if (matchingDate != null) {
          matchingDate.count += 1;
        } else {
          grouped[data.taskId].dates.push(currentRange);
        }
      }
    });
    return Object.values(grouped);
  };

  return (
    <div className={classes.inspectorLayoutContainer}>
      <div className={`${classes.inspectorDaySummary} ${classes.inspectorInteriorSection}`}>
        <Typography variant={variant.title}>
          <b>{daySummary(total, skillTitle, formatDate(new Date(inspectorData.x)))}</b>
        </Typography>
      </div>
      <InspectorSection
        title="Stated Availability (before Sign-Ups)"
        lineElement={AvailabilityLine}
        data={inspectorData.availability}
      />
      <InspectorSection
        title="Vacancies"
        lineElement={VacanciesLine}
        data={groupVacancies(inspectorData.vacancies)}
      />
      <InspectorSection
        title="Sign Ups"
        lineElement={AvailabilityLine}
        data={inspectorData.signedUp}
      />
    </div>
  );
};
