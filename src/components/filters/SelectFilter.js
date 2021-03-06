import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { DatesDialog } from '../datesdialog/DateDialog';
import { setFilterParams } from '../../state/actions/FilterParamActions';

export const SelectFilter = ({ filter, params, closeMenu }) => {
  const dispatch = useDispatch();
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOption, setDatePickerOption] = useState(null);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    setDatePickerOption(filter.options.find((option) => option.datePicker === true));
  }, [filter]);

  const handleFilterUpdate = (selectedOption, customRange) => {
    dispatch(setFilterParams(filter.id, [selectedOption.id, ...customRange]));
  };

  const handleListItemClick = (selectedOption) => {
    if (selectedOption === datePickerOption) {
      setOpenDates(true);
    } else {
      handleFilterUpdate(selectedOption, []);
      closeMenu();
    }
  };

  const handleCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      handleFilterUpdate(datePickerOption, [range.startDate, range.endDate]);
    }
    closeMenu();
  };

  const validForTab = (option) =>
    typeof option.tabs === 'undefined' ||
    currentTab === null ||
    option.tabs.includes(currentTab.id);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return filter.options.map((option, index) => (
    <React.Fragment key={index}>
      {option.datePicker ? <Divider /> : null}
      <ListItem
        button
        selected={option.id === params[0]}
        onClick={() => handleListItemClick(option)}
        disabled={!validForTab(option)}
        dense
      >
        <ListItemText primary={capitalize(option.label)} />
      </ListItem>
      {option.datePicker ? (
        <>
          <DatesDialog
            open={openDates}
            prompt="Enter a date range to filter by."
            firstDateLabel={`${filter.labels.filter} on or after`}
            secondDateLabel={`${filter.labels.filter} on or before`}
            handleClose={handleCloseDatesDialog}
            initRange={
              params.length === 3 ? { startDate: params[1], endDate: params[2] } : undefined
            }
          />
        </>
      ) : null}
    </React.Fragment>
  ));
};
