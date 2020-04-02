import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { executeFilters } from '../../redux/selectors/TaskSelector';
import { setFilterControl } from '../../redux/actions/TaskFilterActions';
import { SelectControl } from './SelectControl';

export const SelectFilter = ({ filterControl }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const filterControls = useSelector((state) => state.filterControls);
  const filterBarVisible = useSelector((state) => state.filterBarVisible);

  const handleOptionSelected = (optionId) => {
    dispatch(setFilterControl({ id: filterControl.id, selectedId: optionId }));
  };

  const handleDateRangeSelected = (optionId, from, to) => {
    dispatch(
      setFilterControl({
        id: filterControl.id,
        selectedId: optionId,
        params: { from, to },
      })
    );
  };

  const preCountResults = (option) => {
    if (option.dontPreCount) {
      return -1;
    }
    return executeFilters(
      tasks,
      filterControls.map((fc) =>
        fc.id === filterControl.id ? { ...fc, selectedId: option.id } : fc
      ),
      filterBarVisible
    ).length;
  };

  return (
    <SelectControl
      control={filterControl}
      handleOptionSelected={handleOptionSelected}
      handleDateRangeSelected={handleDateRangeSelected}
      preCountResults={preCountResults}
    />
  );
};
