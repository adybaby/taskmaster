import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { setSearchTerm } from '../actions/Tasks';

const TaskResult = task => {
  const dispatch = useDispatch();

  const handleLinkClick = element => {
    dispatch(setSearchTerm(element));
  };

  const listOfLinks = links => {
    if (typeof links === 'undefined' || links.length < 1) return links;
    return links.map(element => {
      element.trim();
      return (
        <Link
          style={{ marginRight: 5, textDecoration: 'underline' }}
          key={element}
          value={element}
          href="#"
          onClick={() => handleLinkClick(element)}
        >
          {element}
        </Link>
      );
    });
  };

  const caption = _task => {
    let line = `Created on ${_task.createdDate} by ${_task.createdBy}`;
    if (_task.startDate != null) line += `, starting on ${_task.startDate}`;
    return line;
  };

  return (
    <div>
      <Typography variant="caption">{caption(task)}</Typography>
      <Typography variant="h5">
        <RouterLink to={`/task/${task.id}`}>
          {`${task.title} (${task.type}${task.type === 'Driver' ? ` ${task.priority}` : ''})`}
        </RouterLink>
      </Typography>
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
};

export default TaskResult;
