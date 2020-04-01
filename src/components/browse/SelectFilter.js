import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../../styles/Styles';
import { setFilterControl } from '../../redux/actions/TaskFilterActions';
import { DatesDialog } from './DatesDialog';
import { executeFilters } from '../../redux/selectors/TaskSelector';

const useStyles = makeStyles((theme) => styles(theme));

export const SelectFilter = ({ filterControl }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [openDates, setOpenDates] = useState(false);
  const [datePickerFilterId, setDatePickerFilterId] = useState(null);
  const tasks = useSelector((state) => state.tasks);
  const filterControls = useSelector((state) => state.filterControls);
  const filterBarVisible = useSelector((state) => state.filterBarVisible);
  const currentTab = useSelector((state) => state.currentTab);
  const theme = useTheme();

  useEffect(() => {
    const datePickerFilter = filterControl.filters.find((filter) => filter.datePicker === true);
    if (typeof datePickerFilter !== 'undefined')
      setDatePickerFilterId(filterControl.filters.find((filter) => filter.datePicker === true).id);
  }, [filterControl.filters]);

  const handleChange = (event) => {
    const selectedFilterId = event.target.value;
    if (selectedFilterId === datePickerFilterId) {
      setOpenDates(true);
    } else {
      dispatch(setFilterControl({ ...filterControl, selectedFilterId }));
    }
  };

  const handleCloseDates = (from, to) => {
    setOpenDates(false);
    if (!(from === null && to === null)) {
      dispatch(
        setFilterControl({
          id: filterControl.id,
          selectedFilterId: datePickerFilterId,
          params: { from, to },
        })
      );
    }
  };

  const preCountFilterResults = (filter) => {
    if (filter.dontPreCount) {
      return -1;
    }
    return executeFilters(
      tasks,
      filterControls.map((fc) =>
        fc.id === filterControl.id ? { ...fc, selectedFilterId: filter.id } : fc
      ),
      filterBarVisible,
      currentTab
    ).length;
  };

  const selectProps = {};
  if (filterControl.selectedFilterId !== filterControl.defaultFilterId) {
    selectProps.style = { color: theme.palette.primary.main, fontWeight: 'bold' };
  }

  return (
    <FormControl key={filterControl.id} size="small" className={classes.filterControl}>
      <InputLabel id={`${filterControl.label}label`}>{filterControl.label}</InputLabel>
      <Select
        autoWidth={true}
        defaultValue={filterControl.defaultFilterId}
        labelId={`${filterControl.label}select-label`}
        id={`${filterControl.label}select`}
        onChange={(event) => handleChange(event)}
        value={filterControl.selectedFilterId}
        color="secondary"
        {...selectProps}
      >
        {filterControl.filters.map((filter, index) => {
          const count = preCountFilterResults(filter);
          return (
            <MenuItem key={index} name={filter.label} value={filter.id} disabled={count === 0}>
              {filter.label}
              {count === -1 ? null : ` (${count})`}
            </MenuItem>
          );
        })}
        )
      </Select>
      <DatesDialog
        open={openDates}
        handleClose={handleCloseDates}
        currentPickerTitle={filterControl.label}
      />
    </FormControl>
  );
};
