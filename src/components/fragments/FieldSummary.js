import React from 'react';
import * as TYPES from '../../data/fields/Type';
import { plannedDates } from '../../util/Dates';
import { displayNameForCost } from '../../data/fields/Cost';
import CreatedByLink from './CreatedByLink';

const FieldSummary = ({ task }) => {
  const cost = () =>
    task.type === TYPES.INITIATIVE ? `, Cost: ${displayNameForCost(task.cost)}` : '';
  const dates = () =>
    task.type === TYPES.INITIATIVE ? `, ${plannedDates(task.startDate, task.endDate)}` : '';

  return (
    <>
      {`${task.type} ${task.id}, Priority: ${task.priority}${cost()}${dates()}, Created on ${
        task.createdDate
      } by `}
      <CreatedByLink createdBy={task.createdBy} />
    </>
  );
};

export default FieldSummary;
