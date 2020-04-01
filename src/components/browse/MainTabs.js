import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBullseye, faCodeBranch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/Styles';
import { setFilterControl } from '../../redux/actions/TaskFilterActions';
import * as URLS from '../../Urls';
import { FILTER_IDS } from '../../data/filters/Filters';
import { TASK_TYPE_FILTERS } from '../../data/filters/TaskTypeFilters';

const useStyles = makeStyles((theme) => styles(theme));

export const TABS = {
  ALL: {
    ID: 'ALL_TAB',
    LABEL: 'All',
    URL: URLS.ALL,
    TASK_TYPE: TASK_TYPE_FILTERS.ALL.id,
  },
  DRIVERS: {
    ID: 'DRIVERS_TAB',
    LABEL: 'Drivers',
    URL: URLS.DRIVERS,
    TASK_TYPE: TASK_TYPE_FILTERS.DRIVER.id,
  },
  ENABLERS: {
    ID: 'ENABLERS_TAB',
    LABEL: 'Enablers',
    URL: URLS.ENABLERS,
    TASK_TYPE: TASK_TYPE_FILTERS.ENABLER.id,
  },
  INITIATIVES: {
    ID: 'INITIATIVES_TAB',
    LABEL: 'Initiatives',
    URL: URLS.INITIATIVES,
    TASK_TYPE: TASK_TYPE_FILTERS.INITIATIVE.id,
  },
  MAP: {
    ID: 'MAP_TAB',
    LABEL: 'Map',
    URL: URLS.MAP,
    TASK_TYPE: null,
  },
  CHARTS: {
    ID: 'CHARTS_TAB',
    LABEL: 'Charts',
    URL: URLS.CHARTS,
    TASK_TYPE: null,
  },
};

export const DEFAULT_TAB = TABS.ALL;

export const MainTabs = ({ tabField, setTabField }) => {
  const classes = useStyles();
  const url = useParams().id;
  const tabFromUrl =
    typeof url !== 'undefined'
      ? Object.entries(TABS).filter((_tab) => _tab[1].URL === url)[0][1]
      : TABS.ALL;
  const dispatch = useDispatch();

  useEffect(() => {
    if (tabField !== tabFromUrl) {
      setTabField(tabFromUrl);
      if (tabFromUrl.TASK_TYPE !== null) {
        dispatch(setFilterControl({ id: FILTER_IDS.TYPE, selectedFilterId: tabFromUrl.TASK_TYPE }));
      }
    }
  }, [dispatch, tabFromUrl, tabField, setTabField]);

  const createTab = (TAB, icon) => (
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

  return (
    <div className={classes.mainTabBar}>
      <Tabs value={tabField.ID} indicatorColor="primary" variant="scrollable" scrollButtons="auto">
        {createTab(TABS.ALL, faSearch)}
        {createTab(TABS.DRIVERS, faBullseye)}
        {createTab(TABS.ENABLERS, faCodeBranch)}
        {createTab(TABS.INITIATIVES, faLightbulb)}
        {createTab(TABS.MAP, faMap)}
        {createTab(TABS.CHARTS, faChartBar)}
      </Tabs>
    </div>
  );
};
