import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import styles from './styles/Styles';
import SearchBar from './components/SearchBar';
import SearchTabs, { TABS } from './components/SearchTabs';
import FilterBar from './components/FilterBar';
import SearchResults from './components/SearchResults';
import { TYPES } from './data/Items';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(TABS.ALL);
  const [searchTerm, setSearchTerm] = React.useState(null);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const typeFilter = () => {
    switch (currentTab) {
      case TABS.DRIVERS:
        return TYPES.DRIVER;
      case TABS.ENABLERS:
        return TYPES.ENABLER;
      case TABS.INITIATIVES:
        return TYPES.INITIATIVE;
      default:
        return null;
    }
  };

  return (
    <div className={classes.background}>
      <CssBaseline />
      <div className={classes.root}>
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className={classes.secondaryBar}>
          <SearchTabs setCurrentTab={setCurrentTab} currentTab={currentTab} />

          <ToggleButton
            variant="text"
            className={classes.filterButton}
            onClick={handleFilterToggle}
            selected={showFilters}
          >
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters
          </ToggleButton>
        </div>
        {showFilters ? <FilterBar /> : null}
        <SearchResults type={typeFilter()} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;
