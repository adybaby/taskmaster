import React from 'react';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../../redux/actions/TaskListFilterActions';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';

export const TagsList = ({ tags, variant }) => {
  const handleTagClick = (dispatch, tag) => {
    dispatch(resetAllTaskListFilterControls());
    dispatch(setTaskListFilterControl({ id: TASK_FILTER_CONTROL_IDS.SEARCH_FIELD, text: tag }));
  };

  return <LinksList links={tags} handleLinkClick={handleTagClick} url="/" variant={variant} />;
};
