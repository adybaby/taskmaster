import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskFilter } from '../actions/TaskFilters';
import * as URLS from '../constants/Urls';

const CreatedByLink = ({ createdBy }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const user = users.filter(currentUser =>
    typeof currentUser === 'undefined' ? false : currentUser.id === createdBy
  )[0];

  const handleCreatedByClick = () => {
    dispatch(setTaskFilter({ type: 'searchTerm', value: '' }));
    dispatch(setTaskFilter({ type: 'filterBar', enabled: true }));
    dispatch(setTaskFilter({ type: 'createdBy', value: user.id }));
  };

  return typeof user === 'undefined' ? null : (
    <>
      <Link value={user.id} component={RouterLink} to={`/${URLS.PROFILE}/${user.id}`}>
        {user.name}
      </Link>
      {user.authored > 0 ? (
        <Link
          value={user.id}
          component={RouterLink}
          to="/"
          onClick={() => {
            handleCreatedByClick();
          }}
        >
          {` (${user.authored})`}
        </Link>
      ) : null}
    </>
  );
};

export default CreatedByLink;
