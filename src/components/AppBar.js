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
import Link from './RouterLink';
import styles from '../styles/Styles';
import { setSearchTerm, setTab, clearTaskFilters } from '../actions/Tasks';
import { DEFAULT } from '../constants/Tabs';

const useStyles = makeStyles(theme => styles(theme));

const AppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.searchTerm);

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = event => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleHomeClick = () => {
    dispatch(setSearchTerm(''));
    dispatch(clearTaskFilters());
    dispatch(setTab(DEFAULT));
  };

  return (
    <div className={classes.grow}>
      <MUIAppBar position="static">
        <Toolbar>
          <Link to="/" onClick={handleHomeClick}>
            <Typography className={classes.title} variant="h6" noWrap>
              TASKMASTER
            </Typography>
          </Link>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Button color="inherit" startIcon={<AddCircle />} onClick={handleNewClick}>
              NEW..
            </Button>
            <IconButton edge="end" component={Link} to="/profile/:tbd" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default AppBar;
