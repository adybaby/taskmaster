import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBullseye, faCodeBranch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import styles from '../styles/Styles';
import * as TASK_TYPES from '../constants/TaskTypes';
import * as TASK_FILTERS from '../constants/TaskFilters';
import { addTaskFilter, removeTaskFilter } from '../actions/Tasks';

const useStyles = makeStyles(theme => styles(theme));
const TABS = {
  ALL: 'All',
  MAP: 'Map',
  CHARTS: 'Charts'
};

const TaskTabs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState(TABS.ALL);

  const handleChange = (event, tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case TABS.CHARTS:
        break;
      case TABS.MAP:
        break;
      case TABS.ALL:
        dispatch(removeTaskFilter({ type: TASK_FILTERS.TYPE }));
        break;
      default:
        dispatch(addTaskFilter({ type: TASK_FILTERS.TYPE, value: tab }));
    }
  };

  const searchTab = (name, tab, icon) => (
    <Tab
      value={tab}
      className={classes.tab}
      label={
        <div>
          <FontAwesomeIcon icon={icon} className={classes.tabIcon} />
          {name}
        </div>
      }
    />
  );

  return (
    <Tabs value={currentTab} onChange={handleChange} indicatorColor="primary">
      {searchTab('All', TABS.ALL, faSearch)}
      {searchTab('Drivers', TASK_TYPES.DRIVER, faBullseye)}
      {searchTab('Enablers', TASK_TYPES.ENABLER, faCodeBranch)}
      {searchTab('Initiatives', TASK_TYPES.INITIATIVE, faLightbulb)}
      {searchTab('Map', TABS.MAP, faMap)}
      {searchTab('Charts', TABS.CHARTS, faChartBar)}
    </Tabs>
  );
};

export default TaskTabs;
