import React from 'react';
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
import { Link } from 'react-router-dom';
import styles from '../styles/Styles';
import { setTaskFilter, clearTaskFilters, setTab } from '../actions/Tasks';
import ToggleButton from './ToggleButton';
import FilterBar from './FilterBar';
import * as TABS from '../constants/Tabs';

const useStyles = makeStyles(theme => styles(theme));

const TabsBar = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector(state => state.tab);

  const handleChange = (event, tab) => {
    dispatch(setTab(tab));
    if (tab === TABS.INITIATIVES) {
      dispatch(setTaskFilter({ type: 'vacancies', enabled: true }));
    } else {
      dispatch(setTaskFilter({ type: 'vacancies', enabled: false }));
    }

    switch (tab) {
      case TABS.CHARTS:
        break;
      case TABS.MAP:
        break;
      default:
        dispatch(setTaskFilter({ type: 'type', value: tab }));
    }
  };

  const tab = (name, icon, path) => (
    <Tab
      value={name}
      className={classes.tab}
      component={Link}
      to={path}
      label={
        <div>
          <FontAwesomeIcon icon={icon} className={classes.tabIcon} />
          {name}
        </div>
      }
    />
  );

  const handleFilterToggle = () => {
    if (showFilters) {
      dispatch(clearTaskFilters());
    }
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className={classes.secondaryBar}>
        <Tabs value={currentTab} onChange={handleChange} indicatorColor="primary">
          {tab(TABS.ALL, faSearch, '/')}
          {tab(TABS.DRIVERS, faBullseye, '/')}
          {tab(TABS.ENABLERS, faCodeBranch, '/')}
          {tab(TABS.INITIATIVES, faLightbulb, '/')}
          {tab(TABS.MAP, faMap, '/map')}
          {tab(TABS.CHARTS, faChartBar, '/charts')}
        </Tabs>

        {currentTab !== TABS.MAP && currentTab !== TABS.CHARTS ? (
          <ToggleButton
            value="toggleButton"
            variant="text"
            className={classes.filterButton}
            onClick={handleFilterToggle}
            selected={showFilters}
          >
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters & Sort
          </ToggleButton>
        ) : null}
      </div>
      {showFilters ? <FilterBar /> : null}
    </div>
  );
};

export default TabsBar;
