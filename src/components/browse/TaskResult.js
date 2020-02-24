import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import FieldSummary from '../lists/FieldSummary';
import { VacancyList } from '../lists/Vacancies';
import TagsList from '../lists/TagsList';

const TaskResult = ({ task }) => {
  return (
    <div>
      <Typography variant="h5">
        <RouterLink to={`/task/${task.id}`}>{task.title}</RouterLink>
      </Typography>
      <Typography variant="body1">{task.shortDescription}</Typography>
      <Typography variant="caption">
        <FieldSummary task={task} />
        <br />
        {task.vacancies === null ? null : (
          <>
            <VacancyList vacancies={task.vacancies} />
            <br />
          </>
        )}
        <TagsList tags={task.tags} />{' '}
      </Typography>
    </div>
  );
};

export default TaskResult;
