import React from 'react';
import { useDispatch } from 'react-redux';
import { setTaskListFilterControl } from '../../state/actions/TaskListFilterActions';
import { SelectControl } from './SelectControl';

export const TaskSelectFilter = ({ filterControl }) => {
  const dispatch = useDispatch();

  const handleOptionSelected = (selectedId) => {
    dispatch(setTaskListFilterControl({ id: filterControl.id, selectedId }));
  };

  const handleDateRangeSelected = (selectedId, from, to) => {
    const options = [...filterControl.options];
    options.find((option) => option.id === selectedId).params = { from, to };

    dispatch(
      setTaskListFilterControl({
        id: filterControl.id,
        selectedId,
        options,
      })
    );
  };

  return (
    <SelectControl
      control={filterControl}
      handleOptionSelected={handleOptionSelected}
      handleDateRangeSelected={handleDateRangeSelected}
    />
  );
};
