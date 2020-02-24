import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles/Styles';
import AppBar from './components/AppBar';
import BrowsePanel from './components/browse/BrowsePanel';
import TaskPanel from './components/taskpanels/TaskPanel';
import ProfilePanel from './components/ProfilePanel';
import * as URLS from './constants/Urls';
import { initialise } from './actions/Db';
import * as DB_STATUS from './constants/Db';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dbStatus = useSelector(state => state.dbStatus);

  useEffect(() => {
    if (dbStatus === DB_STATUS.NOT_INITIALISED) {
      dispatch(initialise());
    }
  }, [dispatch, dbStatus]);

  switch (dbStatus) {
    case DB_STATUS.NOT_INITIALISED:
      return <div>A local cache has not yet been created from the database..</div>;
    case DB_STATUS.INITIALISING:
      return <div>Please wait whilst a local cache of the database is created..</div>;
    case DB_STATUS.ERROR:
      return <div>There was an error creating the local cache from the database..</div>;
    default:
      return (
        <div>
          <CssBaseline />
          <div className={classes.background}>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar />
              <Switch>
                <Route exact path="/">
                  <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
                </Route>
                <Route path={`/${URLS.TASK}/:id`} component={TaskPanel} />
                <Route path={`/${URLS.PROFILE}/:id`} component={ProfilePanel} />
                <Route path={`/${URLS.PROFILE}/`} component={ProfilePanel} />
                <Route path={`/${URLS.BROWSE}/:id`} component={BrowsePanel} />
                <Route>
                  <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      );
  }
};

export default App;
