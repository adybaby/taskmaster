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
import Link from './restyled/RouterLink';
import styles from '../styles/Styles';
import { setTaskFilter } from '../actions/TaskFilters';

const useStyles = makeStyles(theme => styles(theme));

const AppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const taskFilters = useSelector(state => state.taskFilters);
  const history = useHistory();

  const handleNewClick = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const handleSearchChange = event => {
    dispatch(setTaskFilter({ type: 'searchTerm', value: event.target.value }));
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    history.push('/');
  };

  const handleHomeClick = () => {
    dispatch(setTaskFilter({ type: 'searchTerm', value: '' }));
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
              value={taskFilters.searchTerm.value}
              onChange={handleSearchChange}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleSearchSubmit(event);
                }
              }}
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
