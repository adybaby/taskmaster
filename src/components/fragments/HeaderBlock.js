import React from 'react';
import Typography from '@material-ui/core/Typography';
import { parseDate } from '../../util/Dates';
import { CreatedByLink } from './CreatedByLink';

export const HeaderBlock = ({ task }) => {
  return (
    <>
      <Typography variant="h4">{task.title}</Typography>
      <Typography variant="caption">
        {`${task.type} ${task.id}, `}
        {task.priority !== null ? `Priority ${task.priority}, ` : null}
      </Typography>
      <Typography variant="caption">
        {'Created by '} <CreatedByLink createdBy={task.createdBy} />
        {` on ${parseDate(task.createdDate)} (last modified on ${parseDate(task.modifiedDate)})`}
      </Typography>
      <br /> <br />
      <Typography variant="h6">Short Description</Typography>
      <Typography variant="body1">{task.shortDescription}</Typography>
      <br />
      <Typography variant="h6">More Information</Typography>
      <Typography variant="body1">{task.moreInformation}</Typography>
    </>
  );
};
