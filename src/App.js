import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enGB from 'date-fns/locale/en-GB';
import { StyledApp } from './styles/Styles';
import { URLS, DB_STATUS } from './constants/Constants';
import { initialise } from './state/actions/DataAndFilterLoaderActions';
import { AppBar } from './components/AppBar';
import { MainTabs } from './components/MainTabs';
import { Task } from './components/tasks/Task';
import { ProfilesPanel } from './components/profile/ProfilesPanel';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGB}>
          <StyledApp>
            <AppBar />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
              </Route>
              <Route path={`/${URLS.TASK}/:id`} component={Task} />
              <Route path={`/${URLS.PROFILE}/:id`} component={ProfilesPanel} />
              <Route path={`/${URLS.PROFILE}/`} component={ProfilesPanel} />
              <Route path={`/${URLS.BROWSE}/:id`} component={MainTabs} />
              <Route>
                <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
              </Route>
            </Switch>
          </StyledApp>
        </MuiPickersUtilsProvider>
      );
  }
};
