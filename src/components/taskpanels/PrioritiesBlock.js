import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import displayTextForContribution from '../../constants/Priorities';

export const PrioritiesLink = ({ id, title, priority }) => (
  <div>
    <RouterLink to={`/task/${id}`}>{title}</RouterLink>
    {` (${displayTextForContribution(priority)})`}
  </div>
);

export const PrioritiesBlock = ({ contributeesAndTheirContribution }) =>
  contributeesAndTheirContribution.map(contributeeAndContribution => (
    <PrioritiesLink
      key={contributeeAndContribution.task.id}
      id={contributeeAndContribution.task.id}
      title={contributeeAndContribution.task.title}
      priority={contributeeAndContribution.contribution}
    />
  ));

export const PrioritiesList = ({ contributeesAndTheirContribution }) =>
  contributeesAndTheirContribution.map(contributeeAndContribution => (
    <div key={contributeeAndContribution.task.id}>
      <PrioritiesLink
        id={contributeeAndContribution.task.id}
        title={contributeeAndContribution.task.title}
        priority={contributeeAndContribution.contribution}
      />
    </div>
  ));
