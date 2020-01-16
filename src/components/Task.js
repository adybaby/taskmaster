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

const Task = task => (
  <div>
    {titleLink(`${task.title} (${task.type})`)}
    <Typography>{task.shortDescription}</Typography>
    <Typography>Links to: {listOfLinks(task.relatedLinks)}</Typography>
    <Typography>{listOfLinks(task.tags)}</Typography>
  </div>
);

export default Task;
