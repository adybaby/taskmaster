import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { TaskLink, TagLinks, VacancyLinks, UserLink } from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.taskResult;

export const TaskResult = ({ task }) => {
  const classes = useStyles()();

  const DurationSummary = ({ ...typographyProps }) =>
    typeof task.startDate !== 'undefined' ? (
      <Typography
        style={{ display: 'inline-block' }}
        variant={variant.durationSummary}
        {...typographyProps}
      >
        Starting on {formatDate(task.startDate)} and ending on {formatDate(task.endDate)}.
      </Typography>
    ) : null;

  const EditingSummary = ({ ...typographyProps }) => (
    <div>
      <Typography
        style={{ display: 'inline-block' }}
        variant={variant.editingSummary}
        {...typographyProps}
      >
        {task.type} (ID: {task.id}, Priority: {task.priority}) created by{`\u00A0`}
      </Typography>
      <UserLink
        userId={task.createdBy}
        userName={task.createdByName}
        variant={variant.editingSummary}
      />
      <Typography
        style={{ display: 'inline-block' }}
        variant={variant.editingSummary}
        {...typographyProps}
      >
        {`\u00A0`}on {formatDate(task.createdDate)} (last modified on{' '}
        {formatDate(task.modifiedDate)})
      </Typography>
    </div>
  );

  return (
    <div className={classes.taskResult}>
      <TaskLink taskId={task.id} taskTitle={task.title} variant={variant.title} />
      <div className={classes.resultDescription}>
        <Typography variant={variant.resultDescription}>{task.shortDescription}</Typography>
      </div>
      <div className={classes.resultFooter}>
        <EditingSummary />
        <DurationSummary />
        {task.type === 'INITIATIVE' ? (
          <div>
            <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
              Vacancies:{`\u00A0`}
            </Typography>
            <VacancyLinks task={task} variant={variant.editingSummary} />
          </div>
        ) : null}
        <div>
          <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
            Tags:{`\u00A0`}
          </Typography>
          <TagLinks task={task} variant={variant.tagsLinks} />
        </div>
      </div>
    </div>
  );
};
