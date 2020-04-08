import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../../redux/actions/TaskListFilterActions';
import { setFilterBarVisible } from '../../redux/actions/FilterBarActions';
import * as URLS from '../../Urls';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const CreatedByLink = ({ createdBy }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const user = users.filter((currentUser) =>
    typeof currentUser === 'undefined' ? false : currentUser.id === createdBy
  )[0];

  const handleCreatedByClick = () => {
    dispatch(setFilterBarVisible(true));
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
