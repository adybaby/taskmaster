import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import styles from './styles/Styles';
import SearchBar from './components/SearchBar';
import TaskTabs from './components/TaskTabs';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import { findTasks, clearTaskFilters } from './actions/Tasks';
import ToggleButton from './components/ToggleB';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTasks(null));
  }, [dispatch]);

  const handleFilterToggle = () => {
    if (showFilters) {
      dispatch(clearTaskFilters());
    }
    setShowFilters(!showFilters);
  };

  return (
    <div className={classes.background}>
      <CssBaseline />
      <div className={classes.root}>
        <SearchBar />
        <div className={classes.secondaryBar}>
          <TaskTabs />

          <ToggleButton
            value="toggleButton"
            variant="text"
            className={classes.filterButton}
            onClick={handleFilterToggle}
            selected={showFilters}
          >
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faFilter} size="sm" /> Filters & Sort
          </ToggleButton>
        </div>
        {showFilters ? <FilterBar /> : null}
        <TaskList />
      </div>
    </div>
  );
};

export default App;
