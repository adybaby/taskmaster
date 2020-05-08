import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { DatesDialog } from './datesdialog/DateDialog';
import { setFilterParams } from '../../state/actions/FilterActions';

export const SelectFilter = ({ filter, closeMenu }) => {
  const dispatch = useDispatch();
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOption, setDatePickerOption] = useState(null);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    setDatePickerOption(filter.options.find((option) => option.datePicker === true));
  }, [filter]);

  const handleFilterUpdate = (selectedOption, params) => {
    dispatch(setFilterParams(filter.id, [selectedOption.id, ...params]));
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
      handleFilterUpdate(datePickerOption, [range.from, range.to]);
    }
    closeMenu();
  };

  const validForTab = (option) =>
    typeof option.tabs === 'undefined' || option.tabs.includes(currentTab.id);

  return filter.options.map((option, index) => (
    <React.Fragment key={index}>
      {option.datePicker ? <Divider /> : null}
      <ListItem
        button
        selected={filter.isSelected(option)}
        onClick={() => handleListItemClick(option)}
        disabled={!validForTab(option)}
        dense
      >
        <ListItemText primary={option.label} />
      </ListItem>
      {option.datePicker ? (
        <>
          <DatesDialog
            open={openDates}
            fieldLabel={filter.labels.filter}
            handleClose={handleCloseDatesDialog}
            initRange={filter.customRange}
          />
        </>
      ) : null}
    </React.Fragment>
  ));
};
