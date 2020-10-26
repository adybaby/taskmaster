import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { DatePicker } from '../datepicker/DatePicker';
import { setFilterParam } from '../../state/actions/FilterParamActions';
import { capitalize } from '../../util/String';

export const SelectFilter = ({ filter, params, closeMenu }) => {
  const dispatch = useDispatch();
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOption, setDatePickerOption] = useState(null);
  const filters = useSelector((state) => state.filters);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    setDatePickerOption(filter.options.find((option) => option.datePicker === true));
  }, [filter]);

  const handleFilterUpdate = (selectedOption, customRange) => {
    dispatch(setFilterParam(filter.id, [selectedOption.id, ...customRange], filters));
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
    option.tabs == null || currentTab == null || option.tabs.includes(currentTab.id);

  return filter.options.map((option, index) => {
    const currentParams = params == null ? filter.defaultParams : params;

    return (
      <React.Fragment key={index}>
        {option.datePicker ? <Divider /> : null}
        <ListItem
          button
          selected={option.id === currentParams[0]}
          onClick={() => handleListItemClick(option)}
          disabled={!validForTab(option)}
          dense
        >
          <ListItemText primary={capitalize(option.label)} />
        </ListItem>
        {option.datePicker ? (
          <>
            <DatePicker
              open={openDates}
              prompt="Enter a date range to filter by."
              firstDateLabel={`${filter.labels.filter} on or after`}
              secondDateLabel={`${filter.labels.filter} on or before`}
              handleClose={handleCloseDatesDialog}
              initRange={
                currentParams.length === 3
                  ? { startDate: currentParams[1], endDate: currentParams[2] }
                  : undefined
              }
            />
          </>
        ) : null}
      </React.Fragment>
    );
  });
};
