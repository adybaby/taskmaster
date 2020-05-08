import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox, ListItemIcon, Divider, Collapse } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { FilterSummary } from './FilterSummary';
import { setFilterParams, resetFilter } from '../../state/actions/FilterActions';

export const CheckGroupFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const variant = typographyVariant.filters;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? 'select-popover' : undefined;
  const currentTab = useSelector((state) => state.currentTab);
  const [maxReached, setMaxReached] = useState(false);

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterConrol = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, paramIn) => {
    if (!paramIn.checked && filter.getChecked().length === filter.maxChecked) {
      setMaxReached(true);
    } else {
      setMaxReached(false);
      dispatch(
        setFilterParams(
          filter.id,
          filter.params.map((param) =>
            param.id === paramIn.id ? { id: param.id, checked: !param.checked } : param
          )
        )
      );
    }
  };

  const handleSelectDefaultClick = () => {
    dispatch(resetFilter(filter));
  };

  const handleSelectNoneClick = () => {
    dispatch(
      setFilterParams(
        filter.id,
        filter.params.map((param) => ({ id: param.id, checked: false }))
      )
    );
  };

  return (
    <div>
      <Button
        data-filter-on={filter.isActive(currentTab)}
        classes={{ root: classes.selectButton }}
        aria-describedby={popOverId}
        onClick={handleOpenFilter}
        focusRipple={false}
      >
        <FilterSummary
          data-filter-on={filter.isActive(currentTab)}
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
        {[
          <ListItem key="selectDefault" button onClick={handleSelectDefaultClick} dense>
            <ListItemText
              className={classes.checkGroupControlButton}
              primary={<b>SELECT DEFAULT</b>}
            />
          </ListItem>,
          <ListItem key="selectNone" button onClick={handleSelectNoneClick} dense>
            <ListItemText
              className={classes.checkGroupControlButton}
              primary={<b>SELECT NONE</b>}
            />
          </ListItem>,
          <ListItem key="close" button onClick={handleCloseFilterConrol} dense>
            <ListItemText className={classes.checkGroupControlButton} primary={<b>CLOSE</b>} />
          </ListItem>,
          <Divider key="divider" />,
          <Collapse key="maxCheckedWarning" in={maxReached} timeout="auto" unmountOnExit>
            <div className={classes.checkGroupMaxSelectedWarning}>
              <ListItem dense>
                <ListItemText primary={<b>PICK UP TO {filter.maxChecked} OPTIONS</b>} />
              </ListItem>
              <Divider />
            </div>
          </Collapse>,
          ...filter.params.map((param, index) => {
            return (
              <ListItem
                key={index}
                dense
                button
                color="primary"
                onClick={(event) => handleListItemClick(event, param)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    color="primary"
                    checked={param.checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={param.id} primary={param.id} />
              </ListItem>
            );
          }),
        ]}
      </Popover>
    </div>
  );
};

/**
             <ListItem
              key={index}
              checkbox
              color="primary"
              checked={param.checked}
              onClick={(event) => handleListItemClick(event, param.id)}
              dense
            >
              <ListItemText primary={param.id} />
            </ListItem>
  
   <FormControlLabel
              key={index}
              value={param.id}
              control={
                <Checkbox
                  color="primary"
                  checked={param.checked}
                  onClick={(event) => handleListItemClick(event, param.id)}
                />
              }
              label={param.id}
              labelPlacement="end"
            />
            * */
