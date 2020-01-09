import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBullseye, faCodeBranch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));
export const TABS = {
  ALL: 'All',
  DRIVERS: 'Drivers',
  ENABLERS: 'Enablers',
  INITIATIVES: 'Initiatives',
  MAP: 'Map',
  CHARTS: 'Charts'
};

const SearchTabs = ({ setCurrentTab, currentTab }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
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
      {searchTab('Drivers', TABS.DRIVERS, faBullseye)}
      {searchTab('Enablers', TABS.ENABLERS, faCodeBranch)}
      {searchTab('Initiatives', TABS.INITIATIVES, faLightbulb)}
      {searchTab('Map', TABS.MAP, faMap)}
      {searchTab('Charts', TABS.CHARTS, faChartBar)}
    </Tabs>
  );
};

export default SearchTabs;
