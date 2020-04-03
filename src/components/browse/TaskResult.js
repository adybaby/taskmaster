import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FieldSummary } from '../fragments/FieldSummary';
import { VacancyList } from '../fragments/Vacancies';
import { TagsList } from '../fragments/TagsList';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const TaskResult = ({ task }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">
        <Link className={classes.link} to={`/task/${task.id}`}>
          {task.title}
        </Link>
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
