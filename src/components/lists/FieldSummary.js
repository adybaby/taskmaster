import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import {
  setSearchTerm,
  clearTaskFilters,
  setFilterBarVisible,
  setTaskFilter
} from '../../actions/Tasks';
import * as TYPES from '../../constants/TaskTypes';
import { plannedDates } from '../../util/StringUtils';
import { displayNameForCost } from '../../constants/Costs';

const FieldSummary = ({ task }) => {
  const dispatch = useDispatch();

  const handleCreatedByClick = createdBy => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(true));
    dispatch(setTaskFilter({ type: 'createdBy', value: createdBy }));
  };

  const cost = () =>
    task.type === TYPES.INITIATIVE ? `, Cost: ${displayNameForCost(task.cost)}` : '';
  const dates = () =>
    task.type === TYPES.INITIATIVE ? `, ${plannedDates(task.startDate, task.endDate)}` : '';
  const CreatedBy = ({ createdBy }) => (
    <Link
      value={createdBy}
      component={RouterLink}
      to="/"
      onClick={() => {
        handleCreatedByClick(createdBy);
      }}
    >
      {task.createdBy}
    </Link>
  );

  return (
    <div>
      {`${task.type} ${task.id}, Priority: ${task.priority}${cost()}${dates()}, Created on ${
        task.createdDate
      } by `}
      <CreatedBy createdBy={task.createdBy} />
    </div>
  );
};

export default FieldSummary;
