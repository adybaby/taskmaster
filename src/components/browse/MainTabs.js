import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBullseye, faCodeBranch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { styles } from '../../styles/Styles';
import { setTaskListFilterControl } from '../../redux/actions/TaskListFilterActions';
import * as URLS from '../../Urls';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';
import * as TASK_TYPES from '../../data/fields/Type';

const useStyles = makeStyles(styles);

export const TABS = {
  ALL: {
    ID: 'ALL_TAB',
    LABEL: 'All',
    URL: URLS.ALL,
  },
  DRIVERS: {
    ID: 'DRIVERS_TAB',
    LABEL: 'Drivers',
    URL: URLS.DRIVERS,
    TASK_TYPE: TASK_TYPES.DRIVER,
  },
  ENABLERS: {
    ID: 'ENABLERS_TAB',
    LABEL: 'Enablers',
    URL: URLS.ENABLERS,
    TASK_TYPE: TASK_TYPES.ENABLER,
  },
  INITIATIVES: {
    ID: 'INITIATIVES_TAB',
    LABEL: 'Initiatives',
    URL: URLS.INITIATIVES,
    TASK_TYPE: TASK_TYPES.INITIATIVE,
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
        dispatch(
          setTaskListFilterControl({
            id: TASK_FILTER_CONTROL_IDS.TYPE,
            selectedId: tabFromUrl.TASK_TYPE,
          })
        );
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
    <Tabs value={tabField.ID} indicatorColor="primary">
      {createTab(TABS.ALL, faSearch)}
      {createTab(TABS.DRIVERS, faBullseye)}
      {createTab(TABS.ENABLERS, faCodeBranch)}
      {createTab(TABS.INITIATIVES, faLightbulb)}
      {createTab(TABS.MAP, faMap)}
      {createTab(TABS.CHARTS, faChartBar)}
    </Tabs>
  );
};
