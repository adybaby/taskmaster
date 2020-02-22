import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setSearchTerm,
  clearTaskFilters,
  setTaskFilter,
  setFilterBarVisible
} from '../actions/Tasks';

const CreatedByLink = ({ createdBy }) => {
  const dispatch = useDispatch();

  const handleCreatedByClick = () => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(true));
    dispatch(setTaskFilter({ type: 'createdBy', value: createdBy }));
  };

  return (
    <Link
      value={createdBy}
      component={RouterLink}
      to="/"
      onClick={() => {
        handleCreatedByClick();
      }}
    >
      {createdBy}
    </Link>
  );
};

export default CreatedByLink;
