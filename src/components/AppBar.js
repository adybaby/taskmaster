import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import { ICONS, TABS } from '../constants/Constants';
import { setFilterParams, resetFilters } from '../state/actions/FilterActions';
import { setCurrentTab } from '../state/actions/CurrentTabActions';
import { getSearchFilter, getSearchText } from '../state/selectors/FilterSelector';

export const AppBar = () => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchFilter = useSelector(getSearchFilter);
  const searchText = useSelector(getSearchText);
  const userName = useSelector((state) => state.currentUser).firstName;

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = (event) => {
    dispatch(setFilterParams(searchFilter.id, [event.target.value]));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(setCurrentTab(TABS.all));
    history.push('/');
  };

  const handleHomeClick = () => {
    dispatch(setCurrentTab(TABS.all));
    dispatch(resetFilters());
  };

  return (
    <div className={classes.appBar}>
      <Tooltip title="Reset task filters and show all tasks">
        <Link className={classes.appTitle} to="/" onClick={handleHomeClick}>
          <Typography variant="h6" noWrap>
            TASKMASTER
          </Typography>
        </Link>
      </Tooltip>
      <Tooltip title="Search for tasks containing..">
        <div className={classes.searchBox}>
          <div className={classes.searchIcon}>{ICONS.SEARCH}</div>
          <InputBase
            value={searchText}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit(event);
              }
            }}
            placeholder="Search…"
            classes={{
              root: classes.searchInputRoot,
              input: classes.searchTextRoot,
            }}
          />
        </div>
      </Tooltip>
      <Tooltip title="Add a new driver, enabler, or initiative">
        <Button
          classes={{ root: classes.appBarButton }}
          color="inherit"
          onClick={handleNewClick}
          size="large"
        >
          {ICONS.NEW}
          <span className={classes.hidingLabel}>New..</span>
        </Button>
      </Tooltip>
      <Tooltip title="View your user profile">
        <Button
          className={classes.appBarButton}
          color="inherit"
          component={Link}
          to="/profile"
          size="large"
        >
          {ICONS.PROFILE}
          <span className={classes.hidingLabel}>{userName}</span>
        </Button>
      </Tooltip>
    </div>
  );
};
