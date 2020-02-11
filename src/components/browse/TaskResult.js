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
      <Typography>{task.shortDescription}</Typography>
      <div>
        <Typography variant="caption">
          <FieldSummary task={task} />
        </Typography>
      </div>
      <VacancyList vacancies={task.vacancies} />
      <TagsList tags={task.tags} />
    </div>
  );
};

export default TaskResult;
