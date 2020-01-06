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

  return (
    <Tabs value={value} onChange={handleChange} indicatorColor="primary">
      <Tab
        className={classes.tab}
        icon={<FontAwesomeIcon icon={faSearch} size="lg" />}
        label="All"
      />
      <Tab
        className={classes.tab}
        icon={<FontAwesomeIcon icon={faBullseye} size="lg" />}
        label="Drivers"
      />
      <Tab
        className={classes.tab}
        icon={<FontAwesomeIcon icon={faCodeBranch} size="lg" />}
        label="Enablers"
      />
      <Tab
        className={classes.tab}
        icon={<FontAwesomeIcon icon={faLightbulb} size="lg" />}
        label="Initiatives"
      />
      <Tab className={classes.tab} icon={<FontAwesomeIcon icon={faMap} size="lg" />} label="Map" />
      <Tab
        className={classes.tab}
        icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
        label="Charts"
      />
    </Tabs>
  );
}
