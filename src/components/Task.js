import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const titleLink = title => (
  <Typography variant="h5">
    <Link href="#">{title}</Link>
  </Typography>
);

const listOfLinks = links =>
  links.map(element => (
    <Link style={{ marginRight: 5, textDecoration: 'underline' }} key={element} href="#">
      {element}
    </Link>
  ));

const caption = task => {
  let line = `Created on ${task.createdDate} by ${task.createdBy}`;
  if (task.startDate != null) line += `, starting on ${task.startDate}`;
  return line;
};

const Task = task => (
  <div>
    <Typography variant="caption">{caption(task)}</Typography>
    {titleLink(`${task.title} (${task.type}${task.type === 'Driver' ? ` ${task.priority}` : ''})`)}
    <Typography>{task.shortDescription}</Typography>
    {task.vacancies != null ? (
      <div>
        <Typography variant="caption">Vacancies: {listOfLinks(task.vacancies)}</Typography>
      </div>
    ) : null}
    <div>
      <Typography variant="caption">{listOfLinks(task.tags)}</Typography>
    </div>
  </div>
);

export default Task;
