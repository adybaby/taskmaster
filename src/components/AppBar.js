import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Link from './fragments/RouterLink';
import styles from '../styles/Styles';
import {
  setFilterControl,
  resetAllFilterControls,
  setFilterBarVisible,
} from '../redux/actions/TaskFilterActions';
import { FILTER_IDS } from '../data/filters/Filters';

const useStyles = makeStyles((theme) => styles(theme));

const AppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchText = useSelector((state) => state.filterControls).find(
    (filterControl) => filterControl.id === FILTER_IDS.SEARCH_FIELD
  ).text;

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = (event) => {
    dispatch(setFilterControl({ id: FILTER_IDS.SEARCH_FIELD, text: event.target.value }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const handleHomeClick = () => {
    dispatch(resetAllFilterControls());
    dispatch(setFilterBarVisible(false));
  };

  return (
    <div className={classes.appBar}>
      <MUIAppBar position="static">
        <Toolbar>
          <Link to="/" onClick={handleHomeClick}>
            <Typography variant="h6" noWrap>
              TASKMASTER
            </Typography>
          </Link>
          <div className={classes.searchBox}>
            <div className={classes.searchIcon}>
              <SearchIcon />
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
          <div>
            <Button color="inherit" startIcon={<AddCircle />} onClick={handleNewClick}>
              NEW..
            </Button>
            <IconButton edge="end" component={Link} to="/profile" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default AppBar;
