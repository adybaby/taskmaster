import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { VacancyLinks, TagsLinks, UserLink } from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.taskResult;

export const TaskResult = ({ task }) => {
  const classes = useStyles();

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
      <UserLink variant={variant.editingSummary} userId={task.createdBy} />
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
      <Typography variant={variant.title}>
        <Link className={classes.link} to={`/task/${task.id}`}>
          {task.title}
        </Link>
      </Typography>
      <div className={classes.resultDescription}>
        <Typography variant={variant.resultDescription}>{task.shortDescription}</Typography>
      </div>
      <div className={classes.resultFooter}>
        <EditingSummary />
        <DurationSummary />
        {typeof task.vacancies !== 'undefined' &&
        task.vacancies.length > 0 &&
        task.vacancies.filter((vacancy) => vacancy.status === 'OPEN').length > 0 ? (
          <div>
            <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
              Vacancies:{`\u00A0`}
            </Typography>
            <VacancyLinks variant={variant.vacancyLinks} task={task} />
          </div>
        ) : null}
        <div>
          <Typography style={{ display: 'inline-block' }} variant={variant.editingSummary}>
            Tags:{`\u00A0`}
          </Typography>
          <TagsLinks variant={variant.tagsLinks} task={task} />
        </div>
      </div>
    </div>
  );
};
