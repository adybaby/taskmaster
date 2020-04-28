import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../state/actions/SortOrderActions';
import { SelectControl } from './SelectControl';

export const SortControl = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((states) => states.sortOrder);

  const handleOptionSelected = (selectedId) => {
    dispatch(setSortOrder({ id: sortOrder.id, selectedId }));
  };

  return <SelectControl control={sortOrder} handleOptionSelected={handleOptionSelected} />;
};
