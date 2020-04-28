import React from 'react';
import { useDispatch } from 'react-redux';
import { setChartFilterControl } from '../../state/actions/ChartFilterActions';
import { SelectControl } from './SelectControl';

export const ChartSelectFilter = ({ filterControl, handleFilterSelected }) => {
  const dispatch = useDispatch();

  const handleOptionSelected = (selectedId) => {
    dispatch(setChartFilterControl({ id: filterControl.id, selectedId }));
    if (typeof handleFilterSelected !== 'undefined') {
      handleFilterSelected(selectedId);
    }
  };

  const handleDateRangeSelected = (selectedId, from, to) => {
    const options = [...filterControl.options];
    options.find((option) => option.id === selectedId).params = { from, to };

    dispatch(
      setChartFilterControl({
        id: filterControl.id,
        selectedId,
        options,
      })
    );
    if (typeof handleFilterSelected !== 'undefined') {
      handleFilterSelected(selectedId);
    }
  };

  return (
    <SelectControl
      control={filterControl}
      handleOptionSelected={handleOptionSelected}
      handleDateRangeSelected={handleDateRangeSelected}
    />
  );
};
