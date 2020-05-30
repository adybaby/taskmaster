import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox, ListItemIcon, Divider, Collapse } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { setFilterParams, resetFilterParams } from '../../state/actions/FilterParamActions';

export const CheckGroupFilter = ({ filter, params, closeMenu }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const [maxReached, setMaxReached] = useState(false);
  const numberChecked = params.filter((p) => p.checked).length;

  const handleListItemClick = (param) => {
    if (!param.checked && numberChecked === filter.maxChecked) {
      setMaxReached(true);
    } else {
      setMaxReached(false);
      dispatch(
        setFilterParams(
          filter.id,
          params.map((stateParam) =>
            stateParam.id === param.id ? { ...stateParam, checked: !param.checked } : stateParam
          )
        )
      );
    }
  };

  const handleSelectDefaultClick = () => {
    dispatch(resetFilterParams(filter));
  };

  const handleSelectNoneClick = () => {
    dispatch(
      setFilterParams(
        filter.id,
        params.map((param) => ({ ...param, checked: false }))
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

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return [
    getGroupControls(),
    ...params.map((param, index) => (
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
        <ListItemText
          id={param.id}
          primary={capitalize(filter.options.find((option) => option.id === param.id).label)}
        />
      </ListItem>
    )),
  ];
};
