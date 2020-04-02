import React from 'react';
import {
  setFilterControl,
  setFilterBarVisible,
  resetAllFilterControls,
} from '../../redux/actions/TaskFilterActions';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';
import { FILTER_IDS } from '../../data/filters/Filters';

export const TagsList = ({ tags, variant }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(setFilterBarVisible(true));
    dispatch(resetAllFilterControls());
    dispatch(setFilterControl({ id: FILTER_IDS.SEARCH_FIELD, text: tag }));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" variant={variant} />;
};
