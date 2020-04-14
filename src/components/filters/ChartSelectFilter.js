import React from 'react';
import { useDispatch } from 'react-redux';
import { setChartFilterControl } from '../../redux/actions/ChartFilterActions';
import { SelectControl } from './SelectControl';

export const ChartSelectFilter = ({ filterControl, handleFilterSelected }) => {
  const dispatch = useDispatch();

  const handleOptionSelected = (optionId) => {
    dispatch(setChartFilterControl({ id: filterControl.id, selectedId: optionId }));
    if (typeof handleFilterSelected !== 'undefined') {
      handleFilterSelected(optionId);
    }
  };

  const handleDateRangeSelected = (optionId, from, to) => {
    dispatch(
      setChartFilterControl({
        id: filterControl.id,
        selectedId: optionId,
        params: { from, to },
      })
    );
    if (typeof handleFilterSelected !== 'undefined') {
      handleFilterSelected(optionId);
    }
  };

  return (
    <SelectControl
      control={filterControl}
      handleOptionSelected={handleOptionSelected}
      handleDateRangeSelected={handleDateRangeSelected}
      yearOnly={true}
    />
  );
};
