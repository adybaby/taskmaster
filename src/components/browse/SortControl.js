import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../redux/actions/SortOrderActions';
import { SelectControl } from './SelectControl';
import { createSortControl } from '../../data/sort/TaskSorter';

export const SortControl = ({ currentTaskType }) => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((states) => states.sortOrder);

  const sortControl = { ...createSortControl(), ...{ selectedId: sortOrder } };

  const handleOptionSelected = (optionId) => {
    dispatch(setSortOrder(optionId));
  };

  return (
    <SelectControl
      control={sortControl}
      handleOptionSelected={handleOptionSelected}
      currentTaskType={currentTaskType}
    />
  );
};
