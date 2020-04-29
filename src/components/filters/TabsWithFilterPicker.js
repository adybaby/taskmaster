import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Collapse from '@material-ui/core/Collapse';
import { Drawer, List, Button, Hidden, Tabs } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { ICONS, TABS } from '../../constants/Constants';
import { setTaskListFilterControl } from '../../state/actions/TaskListFilterActions';
import { setChartFilterControl } from '../../state/actions/ChartFilterActions';
import { setSortOrder } from '../../state/actions/SortOrderActions';
import {
  //  getVisibleTaskFilters,
  getFilterBarControls,
  getActiveFilterBarControls,
} from '../../state/selectors/FilterSelector';
import { SelectControl } from './SelectControl';

export const TabsWithFilterPicker = ({ tabs, visible }) => {
  const classes = useStyles();
  const [filterBarVisible, setFilterBarVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const isAFilterActive = useSelector(getActiveFilterBarControls).length !== 0;
  const filterBarControls = useSelector(getFilterBarControls);
  const sortOrder = useSelector((states) => states.sortOrder);
  const currentTab = useSelector((state) => state.currentTab);

  const makeSelectControls = (filterDispatcher, handleFilterSelected) =>
    filterBarControls.map((filterControl, index) => (
      <SelectControl
        key={index}
        control={filterControl}
        filterDispatcher={filterDispatcher}
        handleFilterSelected={handleFilterSelected}
      />
    ));

  const makeSortControl = () => (
    <SelectControl control={sortOrder} filterDispatcher={setSortOrder} />
  );

  const makeVisibleFilters = () =>
    currentTab === TABS.charts ? (
      makeSelectControls(setChartFilterControl, () => setFilterDrawerVisible(false))
    ) : (
      <>
        {makeSelectControls(setTaskListFilterControl)}
        {makeSortControl()}
      </>
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
        <span style={isAFilterActive ? { color: 'red' } : undefined}>
          {ICONS.FILTER}
          {`\u00A0`}Filters{isAFilterActive ? `\u00A0ON` : ``}
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
        <span style={isAFilterActive ? { color: 'red' } : undefined}>{ICONS.FILTER}</span>
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
        <Tabs value={currentTab} indicatorColor="primary">
          {tabs}
        </Tabs>
        {visible ? (
          <>
            {filterBarButton()}
            {filterDrawerButton()}
          </>
        ) : null}
      </div>
      <Hidden xsUp implementation="css">
        {filterBar()}
      </Hidden>
      <Hidden xsDown implementation="css">
        {filterDrawer()}
      </Hidden>
    </>
  );
};
