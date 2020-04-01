import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import styles from '../../styles/Styles';
import { setFilterBarVisible } from '../../redux/actions/TaskFilterActions';
import ToggleButton from '../fragments/ToggleButton';
import FilterBar from './FilterBar';
import MapPanel from '../maps/MapPanel';
import { ChartPanel } from '../charts/ChartPanel';
import TaskList from './TaskList';
import { DEFAULT_TAB, TABS, MainTabs } from './MainTabs';

const useStyles = makeStyles((theme) => styles(theme));

const BrowsePanel = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const filterBarVisible = useSelector((state) => state.filterBarVisible);
  const [tabField, setTabField] = useState(DEFAULT_TAB);
  const isFilterableTab = tabField !== TABS.MAP && tabField !== TABS.CHARTS;

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
      <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters & Sort
    </ToggleButton>
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <MainTabs tabField={tabField} setTabField={setTabField} {...props} />
        {isFilterableTab ? filterButton() : null}
      </div>

      {isFilterableTab ? (
        <Collapse in={filterBarVisible} timeout="auto" unmountOnExit>
          <FilterBar />
        </Collapse>
      ) : null}

      {getCurrentPanel()}
    </>
  );
};

export default BrowsePanel;
