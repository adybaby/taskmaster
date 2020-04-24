import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@material-ui/core';
import { styles } from '../../styles/Styles';
import { formatDateRange } from '../../util/Dates';
import { DatesDialog } from './datesdialog/DateDialog';

const useStyles = makeStyles(styles);

export const SelectControl = ({
  control,
  handleOptionSelected,
  handleDateRangeSelected,
  preCountResults,
  currentTaskType,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? 'select-popover' : undefined;
  const selected = control.options.find((option) => option.id === control.selectedId);
  const [openDates, setOpenDates] = useState(false);
  const [datePickerOptionId, setDatePickerOptionId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const datePickerOption = control.options.find((option) => option.datePicker === true);
    if (typeof datePickerOption !== 'undefined')
      setDatePickerOptionId(control.options.find((option) => option.datePicker === true).id);
  }, [control.options]);

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

  const formatControlLabel = () =>
    `${control.label} ${selected.datePicker ? formatDateRange(selected.params) : selected.label}`;

  const buttonProps = {};
  if (!control.dontHighlight && control.selectedId !== control.defaultId) {
    buttonProps.style = { color: theme.palette.primary.main, fontWeight: 'bold' };
  }

  const validForTaskType = (option) =>
    typeof currentTaskType === 'undefined' ||
    typeof option.forTaskTypes === 'undefined' ||
    option.forTaskTypes.includes(currentTaskType);

  return (
    <div>
      <Button
        classes={{ root: classes.selectButton }}
        aria-describedby={popOverId}
        onClick={handleOpenFilterControlClick}
        endIcon={<FontAwesomeIcon icon={faCaretDown} />}
        focusRipple={false}
        {...buttonProps}
      >
        {formatControlLabel()}
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
          const count = typeof preCountResults !== 'undefined' ? preCountResults(option) : -1;
          return (
            <React.Fragment key={index}>
              {option.datePicker ? <Divider /> : null}
              <ListItem
                button
                selected={option.id === control.selectedId}
                onClick={(event) => handleListItemClick(event, option.id)}
                disabled={count === 0 || !validForTaskType(option)}
                dense
              >
                <ListItemText primary={`${option.label} ${count === -1 ? '' : ` (${count})`}`} />
              </ListItem>
              {option.datePicker ? <Divider /> : null}
            </React.Fragment>
          );
        })}
      </Popover>
      <DatesDialog
        open={openDates}
        fieldLabel={control.label}
        handleClose={handleCloseDatesDialog}
      />
    </div>
  );
};
