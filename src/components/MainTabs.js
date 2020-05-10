import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import { Tooltip } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import { TABS } from '../constants/Constants';
import { setCurrentTab } from '../state/actions/CurrentTabActions';
import { MapPanel } from './maps/MapPanel';
import { ChartPanel } from './charts/ChartPanel';
import { TaskList } from './browse/TaskList';
import { TabsWithFilterPicker } from './filters/TabsWithFilterPicker';

export const MainTabs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector((state) => state.currentTab);
  const showFilterButton = currentTab !== TABS.map;

  const handleTabChange = (event, tab) => {
    dispatch(setCurrentTab(tab));
  };

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
        disableFocusRipple={true}
        label={
          <Tooltip title={tab.label}>
            <div className={classes.tabLabel}>
              {tab.icon}
              <span className={classes.hidingLabel}>{tab.label}</span>
            </div>
          </Tooltip>
        }
      />
    ));

  return (
    <>
      <TabsWithFilterPicker
        showFilterButton={showFilterButton}
        tabs={createTabs()}
        onChange={handleTabChange}
      />
      {getCurrentPanel()}
    </>
  );
};
