import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import { useStyles } from '../styles/Styles';
import { URLS, TABS, TASK_LIST_FILTER_CONTROL_IDS } from '../constants/Constants';
import { setCurrentTab } from '../state/actions/CurrentTabActions';
import { setTaskListFilterControl } from '../state/actions/TaskListFilterActions';
import { MapPanel } from './maps/MapPanel';
import { ChartPanel } from './charts/ChartPanel';
import { TaskList } from './browse/TaskList';
import { TabsWithFilterPicker } from './filters/TabsWithFilterPicker';

export const MainTabs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const url = useParams().id;
  const currentTab = useSelector((state) => state.currentTab);
  const showFilterButton = currentTab !== TABS.map;

  const tabFromUrl =
    typeof url !== 'undefined' ? Object.values(TABS).find((tab) => tab.url === url) : TABS.all;

  useEffect(() => {
    if (currentTab !== tabFromUrl) {
      dispatch(setCurrentTab(tabFromUrl));
      if (tabFromUrl.taskType !== null) {
        dispatch(
          setTaskListFilterControl({
            id: TASK_LIST_FILTER_CONTROL_IDS.TYPE,
            selectedId: tabFromUrl.taskType,
          })
        );
      }
    }
  }, [dispatch, tabFromUrl, currentTab]);

  const getCurrentPanel = () => {
    switch (currentTab) {
      case TABS.map:
        return <MapPanel />;
      case TABS.charts:
        return <ChartPanel />;
      default:
        return <TaskList />;
    }
  };

  const createTabs = () =>
    Object.values(TABS).map((tab, index) => (
      <Tab
        key={index}
        value={tab}
        className={classes.tab}
        component={Link}
        to={`/${URLS.BROWSE}/${tab.url}`}
        disableFocusRipple={true}
        label={
          <div className={classes.tabLabel}>
            {tab.icon}
            <span className={classes.hidingLabel}>{tab.label}</span>
          </div>
        }
      />
    ));

  return (
    <>
      <TabsWithFilterPicker visible={showFilterButton} tabs={createTabs()} />
      {getCurrentPanel()}
    </>
  );
};
