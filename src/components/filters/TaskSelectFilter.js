import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { executeFilterControls } from '../../data/filters/TaskListFilterControls';
import { setTaskListFilterControl } from '../../redux/actions/TaskListFilterActions';
import { SelectControl } from './SelectControl';

export const TaskSelectFilter = ({ filterControl }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const taskListfilterControls = useSelector((state) => state.taskListfilterControls);
  const filterBarVisible = useSelector((state) => state.filterBarVisible);

  const handleOptionSelected = (optionId) => {
    dispatch(setTaskListFilterControl({ id: filterControl.id, selectedId: optionId }));
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

  const preCountResults = (option) => {
    if (option.dontPreCount) {
      return -1;
    }
    return executeFilterControls(
      tasks,
      taskListfilterControls.map((fc) =>
        fc.id === filterControl.id ? { ...fc, selectedId: option.id } : fc
      ),
      filterBarVisible,
      null,
      true
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
