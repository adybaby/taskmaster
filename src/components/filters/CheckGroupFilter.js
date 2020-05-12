import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox, ListItemIcon, Divider, Collapse } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { setFilterParams, resetFilter } from '../../state/actions/FilterActions';

export const CheckGroupFilter = ({ filter, closeMenu }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const [maxReached, setMaxReached] = useState(false);

  const handleListItemClick = (param) => {
    if (!param.checked && filter.getChecked().length === filter.maxChecked) {
      setMaxReached(true);
    } else {
      setMaxReached(false);
      dispatch(
        setFilterParams(
          filter.id,
          filter.params.map((stateParam) =>
            stateParam.id === param.id ? { id: stateParam.id, checked: !param.checked } : stateParam
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

  const getGroupControls = () => (
    <Fragment key="groupControls">
      <ListItem button onClick={handleSelectDefaultClick} dense>
        <ListItemText className={classes.checkGroupControlButton} primary={<b>SELECT DEFAULT</b>} />
      </ListItem>
      <ListItem button onClick={handleSelectNoneClick} dense>
        <ListItemText className={classes.checkGroupControlButton} primary={<b>SELECT NONE</b>} />
      </ListItem>
      <ListItem button onClick={closeMenu} dense>
        <ListItemText className={classes.checkGroupControlButton} primary={<b>CLOSE</b>} />
      </ListItem>
      <Divider />
      <Collapse in={maxReached} timeout="auto" unmountOnExit>
        <div className={classes.checkGroupMaxSelectedWarning}>
          <ListItem dense>
            <ListItemText primary={<b>PICK UP TO {filter.maxChecked} OPTIONS</b>} />
          </ListItem>
          <Divider />
        </div>
      </Collapse>
    </Fragment>
  );

  return [
    getGroupControls(),
    ...filter.params.map((param, index) => (
      <ListItem key={index} dense button color="primary" onClick={() => handleListItemClick(param)}>
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
    )),
  ];
};
