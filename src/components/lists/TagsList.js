import React from 'react';
import { setTaskFilter } from '../../actions/TaskFilters';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';

const TagsList = ({ tags, variant }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(setTaskFilter({ type: 'searchTerm', value: tag }));
    dispatch(setTaskFilter({ type: 'filterBar', enabled: true }));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" variant={variant} />;
};

export default TagsList;
