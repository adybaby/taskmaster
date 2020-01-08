import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBullseye, faCodeBranch, faChartBar } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));

export default function SearchTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const searchTab = (name, icon) => (
    <Tab
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
    <Tabs value={value} onChange={handleChange} indicatorColor="primary">
      {searchTab('All', faSearch)}
      {searchTab('Drivers', faBullseye)}
      {searchTab('Enablers', faCodeBranch)}
      {searchTab('Initiatives', faLightbulb)}
      {searchTab('Map', faMap)}
      {searchTab('Charts', faChartBar)}
    </Tabs>
  );
}
