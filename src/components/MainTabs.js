import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faBullseye,
  faCodeBranch,
  faChartBar,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Collapse from '@material-ui/core/Collapse';
import { Drawer, List, Button } from '@material-ui/core';
import { styles } from '../styles/Styles';
import { setTaskListFilterControl } from '../redux/actions/TaskListFilterActions';
import * as URLS from '../Urls';
import {
  TASK_FILTER_CONTROL_IDS,
  isAFilterActive as isATaskFilterActive,
} from '../data/filters/TaskListFilterControls';
import { isAFilterActive as isAChartFilterActive } from '../data/filters/ChartFilterControls';
import * as TASK_TYPES from '../data/fields/Type';
import { MapPanel } from './maps/MapPanel';
import { ChartPanel } from './charts/ChartPanel';
import { TaskList } from './browse/TaskList';
import { getCurrentFilters } from './filters/FilterControls';

const useStyles = makeStyles(styles);

const tabs = {
  all: {
    id: 'ALL_TAB',
    label: 'All',
    url: URLS.ALL,
  },
  drivers: {
    id: 'DRIVERS_TAB',
    label: 'Drivers',
    url: URLS.DRIVERS,
    taskType: TASK_TYPES.DRIVER,
  },
  enablers: {
    id: 'ENABLERS_TAB',
    label: 'Enablers',
    url: URLS.ENABLERS,
    taskType: TASK_TYPES.ENABLER,
  },
  initiatives: {
    id: 'INITIATIVES_TAB',
    label: 'Initiatives',
    url: URLS.INITIATIVES,
    taskType: TASK_TYPES.INITIATIVE,
  },
  map: {
    id: 'MAP_TAB',
    label: 'Map',
    url: URLS.MAP,
    taskType: null,
  },
  charts: {
    id: 'CHARTS_TAB',
    label: 'Charts',
    url: URLS.CHARTS,
    taskType: null,
  },
};

const DEFAULT_TAB = tabs.all;

export const MainTabs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const url = useParams().id;
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [tabField, setTabField] = useState(DEFAULT_TAB);
  const taskListFilterControls = useSelector((state) => state.taskListfilterControls);
  const chartFilterControls = useSelector((state) => state.chartFilterControls);
  const showFilterButton = tabField !== tabs.map;

  const tabFromUrl =
    typeof url !== 'undefined'
      ? Object.entries(tabs).filter((tab) => tab[1].url === url)[0][1]
      : tabs.all;

  useEffect(() => {
    if (tabField !== tabFromUrl) {
      setTabField(tabFromUrl);
      if (tabFromUrl.taskType !== null) {
        dispatch(
          setTaskListFilterControl({
            id: TASK_FILTER_CONTROL_IDS.TYPE,
            selectedId: tabFromUrl.taskType,
          })
        );
      }
    }
  }, [dispatch, tabFromUrl, tabField, setTabField]);

  const handleFilterToggle = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleChartFilterSelected = () => {
    setFiltersVisible(false);
  };

  const getCurrentPanel = () => {
    switch (tabField) {
      case tabs.map:
        return <MapPanel />;
      case tabs.charts:
        return <ChartPanel />;
      default:
        return <TaskList />;
    }
  };

  const createTab = (tab, icon) => (
    <Tab
      value={tab.id}
      className={classes.tab}
      component={Link}
      to={`/${URLS.BROWSE}/${tab.url}`}
      label={
        <div>
          <FontAwesomeIcon icon={icon} className={classes.tabIcon} />
          <span className={classes.hidingLabel}>{tab.label}</span>
        </div>
      }
    />
  );

  const filterIconColorProps =
    (isATaskFilterActive(taskListFilterControls, tabField.taskType) && tabField !== tabs.charts) ||
    (isAChartFilterActive(chartFilterControls) && tabField === tabs.charts)
      ? { style: { color: 'red' } }
      : {};

  const filterButton = () => (
    <ToggleButton
      value="showFilterBarButton"
      variant="text"
      className={classes.filterButton}
      onClick={handleFilterToggle}
      selected={filtersVisible}
    >
      <FontAwesomeIcon {...filterIconColorProps} icon={faFilter} size="sm" />{' '}
      <span {...filterIconColorProps} className={classes.hidingLabel}>
        Filters
      </span>
    </ToggleButton>
  );

  const filterDrawer = (
    <Drawer
      className={classes.filterDrawerContainer}
      anchor="right"
      open={filtersVisible}
      onClose={handleFilterToggle}
    >
      <div className={classes.filterDrawerBody}>
        <List>
          {getCurrentFilters(
            tabField,
            tabs,
            taskListFilterControls,
            chartFilterControls,
            handleChartFilterSelected
          )}
        </List>
      </div>
      <div className={classes.drawerControls}>
        <Button color="primary" onClick={handleFilterToggle}>
          Close
        </Button>
      </div>
    </Drawer>
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <Tabs value={tabField.id} indicatorColor="primary">
          {createTab(tabs.all, faSearch)}
          {createTab(tabs.drivers, faBullseye)}
          {createTab(tabs.enablers, faCodeBranch)}
          {createTab(tabs.initiatives, faLightbulb)}
          {createTab(tabs.map, faMap)}
          {createTab(tabs.charts, faChartBar)}
        </Tabs>
        {showFilterButton ? filterButton() : null}
      </div>

      {showFilterButton ? (
        <>
          <Collapse
            className={classes.filterBarContainer}
            in={filtersVisible}
            timeout="auto"
            unmountOnExit
          >
            <div className={classes.filterBar}>
              {getCurrentFilters(tabField, tabs, taskListFilterControls, chartFilterControls)}
            </div>
          </Collapse>
          {filterDrawer}
        </>
      ) : null}

      {getCurrentPanel()}
    </>
  );
};
