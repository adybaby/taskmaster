import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { parseDate } from '../../util/DateFormatting';
import styles from '../../styles/Styles';
import CreatedByLink from '../CreatedByLink';

const useStyles = makeStyles(theme => styles(theme));

const HeaderBlock = ({ task }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.taskBody}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="caption">
          {`${task.type} ${task.id}, `}
          {task.priority !== null ? `Priority ${task.priority}, ` : null}
        </Typography>
        <Typography variant="caption">
          {'Created by '} <CreatedByLink createdBy={task.createdBy} />
          {` on ${parseDate(task.createdDate)} (last modified on ${parseDate(task.modifiedDate)})`}
        </Typography>
      </div>
      <div className={classes.taskBody}>
        <Typography variant="h6">Short Description</Typography>
        <Typography variant="body1">{task.shortDescription}</Typography>
      </div>
      <div className={classes.taskBody}>
        <Typography variant="h6">More Information</Typography>
        <Typography variant="body1">{task.moreInformation}</Typography>
      </div>
    </div>
  );
};

export default HeaderBlock;
