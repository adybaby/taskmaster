/* eslint-disable indent */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import {
  setSearchTerm,
  clearTaskFilters,
  setTaskFilter,
  setFilterBarVisible
} from '../../actions/Tasks';

const useStyles = makeStyles(theme => styles(theme));

const HeaderBlock = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCreatedByClick = createdBy => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(true));
    dispatch(setTaskFilter({ type: 'createdBy', value: createdBy }));
  };

  return (
    <div>
      <div className={classes.taskBody}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="caption">
          {`${task.type} ${task.id}, `}
          {task.priority !== null ? `Priority ${task.priority}, ` : null}
        </Typography>
        <Typography variant="caption">
          {'Created by '}
          <Link
            value={task.createdBy}
            component={RouterLink}
            to="/"
            onClick={() => {
              handleCreatedByClick(task.createdBy);
            }}
          >
            {task.createdBy}
          </Link>
          {' on '}
          {task.createdDate}
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
