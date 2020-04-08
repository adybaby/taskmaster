import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { styles } from '../../styles/Styles';
import { setFilterBarVisible } from '../../redux/actions/FilterBarActions';
import { FilterBar } from '../filters/FilterBar';
import { MapPanel } from '../maps/MapPanel';
import { ChartPanel } from '../charts/ChartPanel';
import { TaskList } from './TaskList';
import { DEFAULT_TAB, TABS, MainTabs } from './MainTabs';

const useStyles = makeStyles(styles);

export const BrowsePanel = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const filterBarVisible = useSelector((state) => state.filterBarVisible);
  const [tabField, setTabField] = useState(DEFAULT_TAB);
  const showFilterButton = tabField !== TABS.MAP;
  const showSortButton = tabField !== TABS.MAP && tabField !== TABS.CHARTS;

  const getCurrentPanel = () => {
    switch (tabField) {
      case TABS.MAP:
        return <MapPanel />;
      case TABS.CHARTS:
        return <ChartPanel />;
      default:
        return <TaskList />;
    }
  };

  const handleFilterToggle = () => {
    dispatch(setFilterBarVisible(!filterBarVisible));
  };

  const filterButton = () => (
    <ToggleButton
      value="showFilterBarButton"
      variant="text"
      className={classes.filterButton}
      onClick={handleFilterToggle}
      selected={filterBarVisible}
    >
      <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" />{' '}
      {`Filters ${showSortButton ? ` & Sort` : ``}`}
    </ToggleButton>
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <MainTabs tabField={tabField} setTabField={setTabField} {...props} />
        {showFilterButton ? filterButton() : null}
      </div>

      {showFilterButton ? (
        <Collapse in={filterBarVisible} timeout="auto" unmountOnExit>
          <FilterBar currentTab={tabField} />
        </Collapse>
      ) : null}

      {getCurrentPanel()}
    </>
  );
};
