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
import styles from '../../styles/Styles';
import { setTaskFilter, clearTaskFilters, setTab, setFilterBarVisible } from '../../actions/Tasks';
import ToggleButton from '../restyled/ToggleButton';
import FilterBar from './FilterBar';
import { TABS } from '../../constants/Tabs';
import MapPanel from '../MapPanel';
import ChartPanel from '../ChartPanel';
import TaskList from './TaskList';
import * as URLS from '../../constants/Urls';
import { HAVE_RESULTS } from '../../constants/FindStatus';

const useStyles = makeStyles(theme => styles(theme));

const BrowsePanel = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTabId = useSelector(state => state.tab);
  const filterBarVisible = useSelector(state => state.filterBarVisible);
  const taskFilters = useSelector(state => state.taskFilters);
  const taskStatus = useSelector(state => state.taskStatus);
  const { id } = useParams();
  const tabFromUrl =
    typeof id !== 'undefined'
      ? Object.entries(TABS).filter(_tab => _tab[1].URL === id)[0][1]
      : null;
  const changeIFilter =
    tabFromUrl === null
      ? false
      : (tabFromUrl.ID === TABS.INITIATIVES.ID) !== taskFilters.vacancies.enabled &&
        filterBarVisible;

  useEffect(() => {
    if (typeof id !== 'undefined' && id !== null && currentTabId !== tabFromUrl.ID) {
      dispatch(setTab(tabFromUrl.ID));
      dispatch(setTaskFilter({ type: 'type', value: tabFromUrl.TASKTYPE }));
    }
    if (changeIFilter) {
      dispatch(
        setTaskFilter({ type: 'vacancies', enabled: tabFromUrl.ID === TABS.INITIATIVES.ID })
      );
    }
  }, [dispatch, tabFromUrl, changeIFilter, currentTabId, id]);

  const getCurrentPanel = () => {
    switch (currentTabId) {
      case TABS.MAP.ID:
        return <MapPanel />;
      case TABS.CHARTS.ID:
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
    if (filterBarVisible) {
      dispatch(clearTaskFilters());
    }
    dispatch(setFilterBarVisible(!filterBarVisible));
  };

  return (
    <div>
      <div className={classes.secondaryBar}>
        <Tabs value={currentTabId} indicatorColor="primary">
          {getTab(TABS.ALL, faSearch)}
          {getTab(TABS.DRIVERS, faBullseye)}
          {getTab(TABS.ENABLERS, faCodeBranch)}
          {getTab(TABS.INITIATIVES, faLightbulb)}
          {getTab(TABS.MAP, faMap)}
          {getTab(TABS.CHARTS, faChartBar)}
        </Tabs>

        {currentTabId !== TABS.MAP.ID && currentTabId !== TABS.CHARTS.ID ? (
          <ToggleButton
            value="toggleButton"
            variant="text"
            className={classes.filterButton}
            onClick={handleFilterToggle}
            selected={filterBarVisible}
          >
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters & Sort
          </ToggleButton>
        ) : null}
      </div>
      {taskStatus === HAVE_RESULTS &&
      currentTabId !== TABS.CHARTS.ID &&
      currentTabId !== TABS.MAP.ID &&
      filterBarVisible ? (
        <FilterBar />
      ) : null}
      {getCurrentPanel()}
    </div>
  );
};

export default BrowsePanel;
