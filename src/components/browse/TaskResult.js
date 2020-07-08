import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { TaskLink } from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.taskResult;

const NewTaskResult = ({ task }) => {
  const classes = useStyles()();

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className={classes.taskResult}>
      <TaskLink taskId={task.id} taskTitle={task.title} variant={variant.title} />
      <div className={classes.resultDescription}>
        <Typography variant={variant.resultDescription}>{task.shortDescription}</Typography>
      </div>
      <div className={classes.resultFooter}>
        <div>
          <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
            {task.type} (ID: {task.id}, Priority: {task.priority}) created by {task.createdByName}
          </Typography>
          <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
            {`\u00A0`}on {formatDate(task.createdDate)} (last modified on{' '}
            {formatDate(task.modifiedDate)})
          </Typography>
        </div>

        {task.startDate != null ? (
          <Typography style={{ display: 'inline-block' }} variant={variant.durationSummary}>
            Starting on {formatDate(task.startDate)} and ending on {formatDate(task.endDate)}.
          </Typography>
        ) : null}

        {task.vacancies.length !== 0 ? (
          <div>
            <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
              Vacancies: {task.vacancies.map((v) => capitalize(v.skillTitle)).join(', ')}
            </Typography>
          </div>
        ) : null}

        <div>
          <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
            Tags: {task.tags.join(', ')}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const TaskResult = React.memo(NewTaskResult, (prev, next) => prev.id === next.id);
