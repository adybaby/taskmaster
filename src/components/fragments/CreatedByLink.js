import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  setFilterControl,
  setFilterBarVisible,
  resetAllFilterControls,
} from '../../redux/actions/TaskFilterActions';
import * as URLS from '../../Urls';
import { FILTER_IDS } from '../../data/filters/Filters';
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
    dispatch(resetAllFilterControls());
    dispatch(setFilterControl({ id: FILTER_IDS.CREATED_BY, selectedId: user.id }));
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
