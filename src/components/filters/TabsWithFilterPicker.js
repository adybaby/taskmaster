import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Collapse from '@material-ui/core/Collapse';
import { Drawer, List, Button, Hidden, Tabs, Tooltip } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { setFilterBarVisible } from '../../state/actions/FilterBarVisibleActions';
import { getFiltersForFilterBar } from '../../state/selectors/FilterSelector';
import { DropDownFilter } from './DropDownFilter';
import { SelectFilter } from './SelectFilter';
import { CheckGroupFilter } from './CheckGroupFilter';
import { Hint, HINT_IDS } from '../hints/Hint';

export const TabsWithFilterPicker = ({ tabs, showFilterButton, onChange }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const filterBarVisible = useSelector((state) => state.filterBarVisible);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const filterBarFilters = useSelector(getFiltersForFilterBar);
  const filterParams = useSelector((state) => state.filterParams);
  const currentTab = useSelector((state) => state.currentTab);

  const isAFilterActive = () => {
    for (let index = 0; index < filterBarFilters.length; index++) {
      const filter = filterBarFilters[index];
      if (!filter.isDefaultParams(filterParams[filter.id]) && !filter.isSortFilter()) {
        return true;
      }
    }
    return false;
  };

  const makeSelectControls = () =>
    filterBarFilters.map((filter, index) => (
      <DropDownFilter key={index} filter={filter} params={filterParams[filter.id]}>
        {filter.isSelectFilter ? (
          <SelectFilter />
        ) : filter.isCheckGroupFilter ? (
          <CheckGroupFilter />
        ) : (
          <div>Error - Filter filter.id has no known type</div>
        )}
      </DropDownFilter>
    ));

  const filterBarButton = () => (
    <Tooltip title="Open Filter Bar">
      <ToggleButton
        value="filterBarButton"
        variant="text"
        className={classes.filterBarButton}
        onClick={() => dispatch(setFilterBarVisible(!filterBarVisible))}
        selected={filterBarVisible}
        disableFocusRipple={true}
      >
        <div className={classes.tabLabel}>
          <span style={isAFilterActive() ? { color: 'red' } : undefined}>
            {ICONS.FILTER}
            {`\u00A0`}Filters{isAFilterActive() ? `\u00A0ON` : ``}
          </span>
        </div>
      </ToggleButton>
    </Tooltip>
  );

  const filterDrawerButton = () => (
    <Tooltip title="Open Filter Drawer">
      <Button
        value="filterDrawerButton"
        variant="text"
        className={classes.filterDrawerButton}
        onClick={() => setFilterDrawerVisible(!filterDrawerVisible)}
        disableFocusRipple={true}
      >
        <div className={classes.tabLabel}>
          <span style={isAFilterActive() ? { color: 'red' } : undefined}>{ICONS.FILTER}</span>
        </div>
      </Button>
    </Tooltip>
  );

  const filterBar = () => (
    <Collapse
      className={classes.filterBarContainer}
      in={filterBarVisible && showFilterButton}
      timeout="auto"
      unmountOnExit
    >
      <div>
        <Hint id={HINT_IDS.FILTERS} className={classes.filterBarHint} />
        <div className={classes.filterBar}>{makeSelectControls()}</div>
      </div>
    </Collapse>
  );

  const filterDrawer = () => (
    <Drawer
      className={classes.drawerBody}
      anchor="right"
      open={filterDrawerVisible && showFilterButton}
      variant="temporary"
      onClose={() => setFilterDrawerVisible(false)}
    >
      <Hint id={HINT_IDS.FILTERS} />
      <List>{makeSelectControls()}</List>
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
        <Tabs value={currentTab} indicatorColor="primary" onChange={onChange}>
          {tabs}
        </Tabs>
        {showFilterButton ? (
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
