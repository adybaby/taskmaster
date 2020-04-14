import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../../redux/actions/TaskListFilterActions';
import * as URLS from '../../Urls';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const CreatedByLink = ({ createdBy }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users).find((_user) => _user.id === createdBy);

  const handleCreatedByClick = () => {
    dispatch(resetAllTaskListFilterControls());
    dispatch(
      setTaskListFilterControl({ id: TASK_FILTER_CONTROL_IDS.CREATED_BY, selectedId: user.id })
    );
  };

  return typeof user === 'undefined' ? null : (
    <>
      <Link className={classes.link} value={user.id} to={`/${URLS.PROFILE}/${user.id}`}>
        {user.name}
      </Link>
      {user.authored.length > 0 ? (
        <Link
          className={classes.link}
          value={user.id}
          to="/"
          onClick={() => {
            handleCreatedByClick();
          }}
        >
          {` (${user.authored.length})`}
        </Link>
      ) : null}
    </>
  );
};
