import React from 'react';
import { useDispatch } from 'react-redux';
import { setChartFilterControl } from '../../redux/actions/ChartFilterActions';
import { SelectControl } from './SelectControl';

export const ChartSelectFilter = ({ filterControl }) => {
  const dispatch = useDispatch();

  const handleOptionSelected = (optionId) => {
    dispatch(setChartFilterControl({ id: filterControl.id, selectedId: optionId }));
  };

  const handleDateRangeSelected = (optionId, from, to) => {
    dispatch(
      setChartFilterControl({
        id: filterControl.id,
        selectedId: optionId,
        params: { from, to },
      })
    );
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
