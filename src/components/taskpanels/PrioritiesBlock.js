/* eslint-disable indent */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import displayTextForContribution from '../../constants/Priorities';

export const PrioritiesLink = ({ id, title, priority }) => (
  <div>
    <RouterLink to={`/task/${id}`}>{title}</RouterLink>
    {` (${displayTextForContribution(priority)})`}
  </div>
);

export const PrioritiesBlock = ({ priorities }) =>
  priorities.map(priorityObj => (
    <PrioritiesLink
      key={priorityObj.task.id}
      id={priorityObj.task.id}
      title={priorityObj.task.title}
      priority={priorityObj.priority}
    />
  ));
