import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar } from './components/AppBar';
import { BrowsePanel } from './components/browse/BrowsePanel';
import { TaskPanel } from './components/tasks/TaskPanel';
import { ProfilesPanel } from './components/profile/ProfilesPanel';
import * as URLS from './Urls';
import { initialise } from './redux/actions/DbActions';
import { DB_STATUS } from './data/db/Db';
import { theme } from './styles/Styles';

export const App = () => {
  const dispatch = useDispatch();
  const dbStatus = useSelector((state) => state.dbStatus);

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
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />
          <Switch>
            <Route exact path="/">
              <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
            </Route>
            <Route path={`/${URLS.TASK}/:id`} component={TaskPanel} />
            <Route path={`/${URLS.PROFILE}/:id`} component={ProfilesPanel} />
            <Route path={`/${URLS.PROFILE}/`} component={ProfilesPanel} />
            <Route path={`/${URLS.BROWSE}/:id`} component={BrowsePanel} />
            <Route>
              <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
            </Route>
          </Switch>
        </MuiThemeProvider>
      );
  }
};
