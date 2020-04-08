import React from 'react';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../../redux/actions/TaskListFilterActions';
import { setFilterBarVisible } from '../../redux/actions/FilterBarActions';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';

export const TagsList = ({ tags, variant }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(setFilterBarVisible(true));
    dispatch(resetAllTaskListFilterControls());
    dispatch(setTaskListFilterControl({ id: TASK_FILTER_CONTROL_IDS.SEARCH_FIELD, text: tag }));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" variant={variant} />;
};
