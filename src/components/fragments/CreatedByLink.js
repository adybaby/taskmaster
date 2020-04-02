import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterControl,
  setFilterBarVisible,
  resetAllFilterControls,
} from '../../redux/actions/TaskFilterActions';
import * as URLS from '../../Urls';
import { FILTER_IDS } from '../../data/filters/Filters';

export const CreatedByLink = ({ createdBy }) => {
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
      <Link value={user.id} component={RouterLink} to={`/${URLS.PROFILE}/${user.id}`}>
        {user.name}
      </Link>
      {user.authored.length > 0 ? (
        <Link
          value={user.id}
          component={RouterLink}
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
