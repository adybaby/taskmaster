import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox, ListItemIcon, Divider, Collapse } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { setFilterParam } from '../../state/actions/FilterParamActions';
import { capitalize } from '../../util/String';

export const CheckGroupFilter = ({ filter, params, closeMenu }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const filters = useSelector((state) => state.filters);
  const [maxReached, setMaxReached] = useState(false);
  const numberChecked = params.filter((p) => p.checked).length;

  const handleListItemClick = (param) => {
    if (!param.checked && numberChecked === filter.maxChecked) {
      setMaxReached(true);
    } else {
      setMaxReached(false);
      dispatch(
        setFilterParam(
          filter.id,
          params.map((stateParam) =>
            stateParam.id === param.id ? { ...stateParam, checked: !param.checked } : stateParam
          ),
          filters
        )
      );
    }
  };

  const handleSelectDefaultClick = () => {
    dispatch(setFilterParam(filter.id, filter.defaultParams, filters));
  };

  const handleSelectNoneClick = () => {
    dispatch(
      setFilterParam(
        filter.id,
        params.map((param) => ({ ...param, checked: false })),
        filters
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
