import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { styles } from '../styles/Styles';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../redux/actions/TaskListFilterActions';
import { TASK_FILTER_CONTROL_IDS } from '../data/filters/TaskListFilterControls';

const useStyles = makeStyles(styles);

export const AppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchText = useSelector((state) => state.taskListfilterControls).find(
    (filterControl) => filterControl.id === TASK_FILTER_CONTROL_IDS.SEARCH_FIELD
  ).text;
  const userName = useSelector((state) => state.currentUser).name;

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = (event) => {
    dispatch(
      setTaskListFilterControl({
        id: TASK_FILTER_CONTROL_IDS.SEARCH_FIELD,
        text: event.target.value,
      })
    );
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const handleHomeClick = () => {
    dispatch(resetAllTaskListFilterControls());
  };

  return (
    <div className={classes.appBar}>
      <Link className={classes.title} to="/" onClick={handleHomeClick}>
        <Typography variant="h6" noWrap>
          TASKMASTER
        </Typography>
      </Link>
      <div className={classes.searchBox}>
        <div className={classes.searchIcon}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <InputBase
          value={searchText}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit(event);
            }
          }}
          placeholder="Search…"
          classes={{
            root: classes.searchInputRoot,
            input: classes.searchTextRoot,
          }}
        />
      </div>
      <Button
        classes={{ root: classes.appBarButton }}
        color="inherit"
        onClick={handleNewClick}
        size="large"
      >
        <FontAwesomeIcon icon={faPlusCircle} />
        <span className={classes.hidingLabel}>New..</span>
      </Button>
      <Button
        className={classes.appBarButton}
        color="inherit"
        component={Link}
        to="/profile"
        size="large"
      >
        <FontAwesomeIcon icon={faUserCircle} />
        <span className={classes.hidingLabel}>{userName}</span>
      </Button>
    </div>
  );
};
