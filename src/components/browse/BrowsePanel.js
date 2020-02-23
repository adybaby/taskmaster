import React, { useEffect } from 'react';
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
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import styles from '../../styles/Styles';
import { setTaskFilter } from '../../actions/TaskFilters';
import { setTab } from '../../actions/Tabs';
import ToggleButton from '../restyled/ToggleButton';
import FilterBar from './FilterBar';
import { TABS, getTabForUrl } from '../../constants/Tabs';
import MapPanel from '../MapPanel';
import ChartPanel from '../ChartPanel';
import TaskList from './TaskList';
import * as URLS from '../../constants/Urls';

const useStyles = makeStyles(theme => styles(theme));

const BrowsePanel = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector(state => state.tab);
  const taskFilters = useSelector(state => state.taskFilters);
  const { id } = useParams();
  const tabFromUrl = getTabForUrl(id);
  const changeIFilter =
    tabFromUrl === null
      ? false
      : (tabFromUrl.ID === TABS.INITIATIVES.ID) !== taskFilters.vacancies.enabled &&
        taskFilters.filterBar.enabled;

  useEffect(() => {
    dispatch(setTab(tabFromUrl));
    dispatch(setTaskFilter({ type: 'type', value: tabFromUrl.TASKTYPE }));
    if (changeIFilter) {
      dispatch(
        setTaskFilter({ type: 'vacancies', enabled: tabFromUrl.ID === TABS.INITIATIVES.ID })
      );
    }
  }, [dispatch, tabFromUrl, changeIFilter, currentTab, id]);

  const getCurrentPanel = () => {
    switch (currentTab) {
      case TABS.MAP:
        return <MapPanel />;
      case TABS.CHARTS:
        return <ChartPanel />;
      default:
        return <TaskList />;
    }
  };

  const getTab = (TAB, icon) => (
    <Tab
      value={TAB.ID}
      className={classes.tab}
      component={Link}
      to={`/${URLS.BROWSE}/${TAB.URL}`}
      label={
        <div>
          <FontAwesomeIcon icon={icon} className={classes.tabIcon} />
          {TAB.LABEL}
        </div>
      }
    />
  );

  const handleFilterToggle = () => {
    dispatch(setTaskFilter({ type: 'filterBar', enabled: !taskFilters.filterBar.enabled }));
  };

  const showFilterBar =
    currentTab !== TABS.CHARTS && currentTab !== TABS.MAP && taskFilters.filterBar.enabled;

  return (
    <div>
      <div className={classes.secondaryBar}>
        <Tabs
          value={currentTab.ID}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {getTab(TABS.ALL, faSearch)}
          {getTab(TABS.DRIVERS, faBullseye)}
          {getTab(TABS.ENABLERS, faCodeBranch)}
          {getTab(TABS.INITIATIVES, faLightbulb)}
          {getTab(TABS.MAP, faMap)}
          {getTab(TABS.CHARTS, faChartBar)}
        </Tabs>

        {currentTab !== TABS.MAP && currentTab !== TABS.CHARTS ? (
          <ToggleButton
            value="toggleButton"
            variant="text"
            className={classes.filterButton}
            onClick={handleFilterToggle}
            selected={taskFilters.filterBar.enabled}
          >
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters & Sort
          </ToggleButton>
        ) : null}
      </div>
      <Collapse in={showFilterBar} timeout="auto" unmountOnExit>
        <FilterBar />
      </Collapse>
      {getCurrentPanel()}
    </div>
  );
};

export default BrowsePanel;
