import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { useAuth0 } from '../Auth';
import { useStyles } from '../styles/Styles';
import { ICONS, TABS, FILTER_IDS } from '../constants/Constants';
import { setFilterParams, resetAllFilterParams } from '../state/actions/FilterParamActions';
import { setCurrentTab } from '../state/actions/CurrentTabActions';

export const AppBar = () => {
  const classes = useStyles()();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();
  const filters = useSelector((state) => state.filters);
  const searchFilterParams = useSelector((state) => state.filterParams)[FILTER_IDS.SEARCH_FIELD];
  const [searchText, setSearchText] = useState('');
  const currentTab = useSelector((state) => state.currentTab);
  const currentUser = useSelector((state) => state.currentUser);
  const actionsCount = currentUser.actions == null ? 0 : currentUser.actions.length;

  useEffect(() => {
    setSearchText(searchFilterParams[0]);
  }, [searchFilterParams]);

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(setFilterParams(FILTER_IDS.SEARCH_FIELD, [event.target.value]));
    if (currentTab === null || currentTab.taskType === null) {
      dispatch(setCurrentTab(TABS.all));
      history.push('/');
    }
  };

  const handleHomeClick = () => {
    dispatch(setCurrentTab(TABS.all));
    dispatch(resetAllFilterParams(filters));
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

      {!isAuthenticated && (
        <Button key="loginbutton" color="inherit" onClick={() => loginWithRedirect()}>
          LOGIN
        </Button>
      )}
      {isAuthenticated && (
        <Tooltip
          title={
            actionsCount > 0
              ? `You have ${actionsCount} ${actionsCount === 1 ? 'action' : 'actions'}`
              : 'View your user profile'
          }
        >
          <Button
            className={classes.appBarButton}
            color="inherit"
            component={Link}
            to="/profile"
            size="large"
          >
            {ICONS.PROFILE}
            <span className={classes.hidingLabel}>{currentUser.firstNames[0]}</span>
            {actionsCount > 0 ? <span style={{ paddingLeft: 5 }}>({actionsCount})</span> : null}
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
