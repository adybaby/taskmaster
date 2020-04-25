import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Collapse from '@material-ui/core/Collapse';
import { Drawer, List, Button, Hidden } from '@material-ui/core';
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
import { TaskSelectFilter } from './filters/TaskSelectFilter';
import { ChartSelectFilter } from './filters/ChartSelectFilter';
import { SortControl } from './filters/SortControl';
import * as ICONS from '../Icons';

const useStyles = makeStyles(styles);

const tabs = {
  all: {
    id: 'ALL_TAB',
    label: 'All',
    filterSummaryLabel: 'item',
    url: URLS.ALL,
  },
  drivers: {
    id: 'DRIVERS_TAB',
    label: 'Drivers',
    filterSummaryLabel: 'driver',
    url: URLS.DRIVERS,
    taskType: TASK_TYPES.DRIVER,
  },
  enablers: {
    id: 'ENABLERS_TAB',
    label: 'Enablers',
    filterSummaryLabel: 'enabler',
    url: URLS.ENABLERS,
    taskType: TASK_TYPES.ENABLER,
  },
  initiatives: {
    id: 'INITIATIVES_TAB',
    label: 'Initiatives',
    filterSummaryLabel: 'initiative',
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
  const [filterBarVisible, setFilterBarVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [tabField, setTabField] = useState(DEFAULT_TAB);
  const taskListFilterControls = useSelector((state) => state.taskListfilterControls);
  const chartFilterControls = useSelector((state) => state.chartFilterControls);
  const showFilterButton = tabField !== tabs.map;

  const tabFromUrl =
    typeof url !== 'undefined' ? Object.values(tabs).find((tab) => tab.url === url) : tabs.all;

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

  const visibleTaskFilterControls = [
    tabs.all,
    tabs.drivers,
    tabs.enablers,
    tabs.initiatives,
  ].includes(tabField)
    ? [
        TASK_FILTER_CONTROL_IDS.CREATED_DATE,
        TASK_FILTER_CONTROL_IDS.CREATED_BY,
        TASK_FILTER_CONTROL_IDS.RUNNING,
        TASK_FILTER_CONTROL_IDS.START_DATE,
        TASK_FILTER_CONTROL_IDS.END_DATE,
        TASK_FILTER_CONTROL_IDS.VACANCIES,
      ]
        .map((id) => taskListFilterControls.find((fc) => fc.id === id))
        .filter(
          (filterControl) =>
            typeof filterControl.forTaskTypes === 'undefined' ||
            filterControl.forTaskTypes.includes(tabField.taskType)
        )
    : [];

  const activeTaskFilterControls = () => {
    const searchControl = taskListFilterControls.find(
      (fc) => fc.id === TASK_FILTER_CONTROL_IDS.SEARCH_FIELD
    );
    return [
      ...visibleTaskFilterControls.filter(
        (filterControl) => filterControl.selectedId !== filterControl.defaultId
      ),
      ...(searchControl.text.length !== 0 ? [searchControl] : []),
    ];
  };

  const filterActive =
    (isATaskFilterActive(taskListFilterControls, tabField.taskType) && tabField !== tabs.charts) ||
    (isAChartFilterActive(chartFilterControls) && tabField === tabs.charts);

  const makeVisibleFilters = (handleFilterSelected) =>
    tabField === tabs.charts ? (
      <ChartSelectFilter
        filterControl={chartFilterControls[0]}
        handleFilterSelected={handleFilterSelected}
      />
    ) : (
      <>
        {visibleTaskFilterControls.map((filterControl, index) => (
          <TaskSelectFilter key={index} filterControl={filterControl} />
        ))}
        <SortControl
          currentTaskType={
            taskListFilterControls.find(
              (filterControl) => filterControl.id === TASK_FILTER_CONTROL_IDS.TYPE
            ).selectedId
          }
        />
      </>
    );

  const getCurrentPanel = () => {
    switch (tabField) {
      case tabs.map:
        return <MapPanel />;
      case tabs.charts:
        return <ChartPanel />;
      default:
        return <TaskList activeFilters={activeTaskFilterControls()} currentTab={tabField} />;
    }
  };

  const createTab = (tab, icon) => (
    <Tab
      value={tab.id}
      className={classes.tab}
      component={Link}
      to={`/${URLS.BROWSE}/${tab.url}`}
      disableFocusRipple={true}
      label={
        <div className={classes.tabLabel}>
          {icon}
          <span className={classes.hidingLabel}>{tab.label}</span>
        </div>
      }
    />
  );

  const filterBarButton = () => (
    <ToggleButton
      value="filterBarButton"
      variant="text"
      className={classes.filterBarButton}
      onClick={() => setFilterBarVisible(!filterBarVisible)}
      selected={filterBarVisible}
      disableFocusRipple={true}
    >
      <div className={classes.tabLabel}>
        <span style={filterActive ? { color: 'red' } : undefined}>
          {ICONS.FILTER}
          {`\u00A0`}Filters{filterActive ? `\u00A0ON` : ``}
        </span>
      </div>
    </ToggleButton>
  );

  const filterDrawerButton = () => (
    <Button
      value="filterDrawerButton"
      variant="text"
      className={classes.filterDrawerButton}
      onClick={() => setFilterDrawerVisible(!filterDrawerVisible)}
      disableFocusRipple={true}
    >
      <div className={classes.tabLabel}>
        <span style={filterActive ? { color: 'red' } : undefined}>{ICONS.FILTER}</span>
      </div>
    </Button>
  );

  const filterBar = () => (
    <Collapse
      className={classes.filterBarContainer}
      in={filterBarVisible}
      timeout="auto"
      unmountOnExit
    >
      <div className={classes.filterBar}>{makeVisibleFilters()}</div>
    </Collapse>
  );

  const filterDrawer = () => (
    <Drawer
      className={classes.drawerBody}
      anchor="right"
      open={filterDrawerVisible}
      variant="temporary"
      onClose={() => setFilterDrawerVisible(false)}
    >
      <List>{makeVisibleFilters(() => setFilterDrawerVisible(false))}</List>
      <div className={classes.drawerControls}>
        <Button
          color="primary"
          classes={{ root: classes.closeDrawerButton }}
          onClick={() => setFilterDrawerVisible(false)}
        >
          Close
        </Button>
      </div>
    </Drawer>
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <Tabs value={tabField.id} indicatorColor="primary">
          {createTab(tabs.all, ICONS.ALL_TAB)}
          {createTab(tabs.drivers, ICONS.DRIVER)}
          {createTab(tabs.enablers, ICONS.ENABLER)}
          {createTab(tabs.initiatives, ICONS.INITIATIVE)}
          {createTab(tabs.map, ICONS.MAP)}
          {createTab(tabs.charts, ICONS.CHARTS)}
        </Tabs>
        {showFilterButton ? (
          <>
            {filterBarButton()}
            {filterDrawerButton()}
          </>
        ) : null}
      </div>
      {showFilterButton ? (
        <>
          {filterBar()}
          <Hidden xsDown implementation="css">
            {filterDrawer()}
          </Hidden>
        </>
      ) : null}

      {getCurrentPanel()}
    </>
  );
};
