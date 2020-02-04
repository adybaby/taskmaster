import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setSearchTerm,
  clearTaskFilters,
  setFilterBarVisible,
  setTaskFilter
} from '../actions/Tasks';
import ListOfLinks from './ListOfLinks';
import * as URLS from '../constants/Urls';

const TaskResult = ({ task }) => {
  const dispatch = useDispatch();

  const caption = _task => {
    let line = `Created on ${_task.createdDate} by ${_task.createdBy}`;
    if (_task.startDate != null) line += `, starting on ${_task.startDate}`;
    return line;
  };

  const handleTagsClick = tag => {
    dispatch(setSearchTerm(tag));
  };

  const handleVacancyClick = vacancy => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(true));
    dispatch(setTaskFilter({ type: 'vacancies', value: vacancy }));
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
      <ListOfLinks
        title="Vacancies"
        links={task.vacancies}
        handleLinkClick={handleVacancyClick}
        url={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
      />
      <ListOfLinks links={task.tags} handleLinkClick={handleTagsClick} url="/" />
    </div>
  );
};

export default TaskResult;
