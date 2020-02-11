import React from 'react';
import {
  setSearchTerm,
  setTab,
  clearTaskFilters,
  setFilterBarVisible,
  setTaskFilter
} from '../../actions/Tasks';
import { DEFAULT } from '../../constants/Tabs';
import { LinksList } from './LinksList';
import * as TYPES from '../../constants/TaskTypes';

const TagsList = ({ tags }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(setSearchTerm(tag));
    dispatch(clearTaskFilters());
    dispatch(setTaskFilter({ type: 'type', value: TYPES.ALL }));
    dispatch(setFilterBarVisible(false));
    dispatch(setTab(DEFAULT));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" />;
};

export default TagsList;
