import React from 'react';
import { setTaskFilter } from '../../actions/TaskFilters';
import { LinksList } from './LinksList';

const TagsList = ({ tags }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(setTaskFilter({ type: 'searchTerm', value: tag }));
    dispatch(setTaskFilter({ type: 'filterBar', enabled: true }));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" />;
};

export default TagsList;
