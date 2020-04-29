import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { TASK_LIST_FILTER_CONTROL_IDS, ICONS } from '../../constants/Constants';
import { FilterSummary } from './FilterSummary';
import { DatesDialog } from './datesdialog/DateDialog';

export const SelectControl = ({ control, filterDispatcher, handleFilterSelected }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const variant = typographyVariant.filters;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? 'select-popover' : undefined;
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOptionId, setDatePickerOptionId] = useState(null);
  const currentTaskType = useSelector((state) => state.taskListfilterControls).find(
    (filterControl) => filterControl.id === TASK_LIST_FILTER_CONTROL_IDS.TYPE
  ).selectedId;

  useEffect(() => {
    const datePickerOption = control.options.find((option) => option.datePicker === true);
    if (typeof datePickerOption !== 'undefined')
      setDatePickerOptionId(control.options.find((option) => option.datePicker === true).id);
  }, [control.options]);

  const handleOptionSelected = (selectedId) => {
    dispatch(filterDispatcher({ id: control.id, selectedId }));
    if (typeof handleFilterSelected !== 'undefined') {
      handleFilterSelected(selectedId);
    }
  };

  const handleDateRangeSelected = (selectedId, from, to) => {
    const options = [...control.options];
    options.find((option) => option.id === selectedId).params = { from, to };

    dispatch(
      filterDispatcher({
        id: control.id,
        selectedId,
        options,
      })
    );
  };

  const handleOpenFilterControlClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterConrol = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, optionId) => {
    if (optionId === datePickerOptionId) {
      setOpenDates(true);
    } else {
      handleOptionSelected(optionId);
      setAnchorEl(null);
    }
  };

  const handleCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      handleDateRangeSelected(datePickerOptionId, range.from, range.to);
    }
    setAnchorEl(null);
  };

  const validForTaskType = (option) =>
    typeof currentTaskType === 'undefined' ||
    typeof option.forTaskTypes === 'undefined' ||
    option.forTaskTypes.includes(currentTaskType);

  const dataFilterOn = !control.dontHighlight && control.selectedId !== control.defaultId;

  return (
    <div>
      <Button
        data-filter-on={String(dataFilterOn)}
        classes={{ root: classes.selectButton }}
        aria-describedby={popOverId}
        onClick={handleOpenFilterControlClick}
        focusRipple={false}
      >
        <FilterSummary
          data-filter-on={String(dataFilterOn)}
          forControl={control}
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
        {control.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              {option.datePicker ? <Divider /> : null}
              <ListItem
                button
                selected={option.id === control.selectedId}
                onClick={(event) => handleListItemClick(event, option.id)}
                disabled={!validForTaskType(option)}
                dense
              >
                <ListItemText primary={option.label} />
              </ListItem>
              {option.datePicker ? (
                <>
                  <Divider />{' '}
                  <DatesDialog
                    open={openDates}
                    fieldLabel={control.label}
                    handleClose={handleCloseDatesDialog}
                    params={option.params}
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
