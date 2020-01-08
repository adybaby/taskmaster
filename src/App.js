import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import styles from './styles/Styles';
import SearchBar from './components/SearchBar';
import SecondaryBar from './components/SearchTabs';
import FilterBar from './components/FilterBar';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();

  const [showFilters, setShowFilters] = React.useState(false);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={classes.background}>
      <CssBaseline />
      <div className={classes.root}>
        <SearchBar />
        <div className={classes.secondaryBar}>
          <SecondaryBar />
          <div className={classes.grow}></div>
          <Button
            className={classes.filterButton}
            size="small"
            startIcon={<FontAwesomeIcon icon={faFilter} />}
            onClick={handleFilterToggle}
          >
            Filters
          </Button>
        </div>
        {showFilters ? <FilterBar /> : null}
      </div>
    </div>
  );
};

export default App;
