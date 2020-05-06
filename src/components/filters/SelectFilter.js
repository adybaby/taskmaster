import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { FilterSummary } from './FilterSummary';
import { DatesDialog } from './datesdialog/DateDialog';
import { setFilterParams } from '../../state/actions/FilterActions';

export const SelectFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const variant = typographyVariant.filters;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? 'select-popover' : undefined;
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOption, setDatePickerOption] = useState(null);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    setDatePickerOption(filter.options.find((option) => option.datePicker === true));
  }, [filter]);

  const handleFilterUpdate = (selectedOption, params) => {
    dispatch(setFilterParams(filter.id, [selectedOption.id, ...params]));
  };

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterConrol = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, selectedOption) => {
    if (selectedOption === datePickerOption) {
      setOpenDates(true);
    } else {
      handleFilterUpdate(selectedOption, []);
      setAnchorEl(null);
    }
  };

  const handleCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      handleFilterUpdate(datePickerOption, [range.from, range.to]);
    }
    setAnchorEl(null);
  };

  const validForTab = (option) =>
    typeof option.tabs === 'undefined' || option.tabs.includes(currentTab.id);

  const dateFilterOn = String(filter.isActive(currentTab) && !filter.isSortFilter());

  return (
    <div>
      <Button
        data-filter-on={dateFilterOn}
        classes={{ root: classes.selectButton }}
        aria-describedby={popOverId}
        onClick={handleOpenFilter}
        focusRipple={false}
      >
        <FilterSummary
          data-filter-on={dateFilterOn}
          forControl={filter}
          variant={variant.filterButton}
          icon={ICONS.DOWN_ARROW}
        />
      </Button>
      <Popover
        id={popOverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilterConrol}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {filter.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              {option.datePicker ? <Divider /> : null}
              <ListItem
                button
                selected={filter.isSelected(option)}
                onClick={(event) => handleListItemClick(event, option)}
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
          );
        })}
      </Popover>
    </div>
  );
};
