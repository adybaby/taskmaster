import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { TaskLink } from '../Link';

const variant = typographyVariant.taskResult;

const NewTaskSummary = ({ taskSummary }) => {
  const classes = useStyles()();

  return (
    <div className={classes.taskResult}>
      <TaskLink taskId={taskSummary.id} taskTitle={taskSummary.title} variant={variant.title} />
      <div className={classes.resultDescription}>
        <Typography variant={variant.resultDescription}>{taskSummary.shortDescription}</Typography>
      </div>
      <div className={classes.resultFooter}>
        {taskSummary.summary.map((summary, key) => (
          <Fragment key={key}>
            <Typography variant={variant.editingSummary}>{summary}</Typography>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const TaskSummary = React.memo(NewTaskSummary, (prev, next) => prev.id === next.id);
