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
import HistoryWriter from './HistoryWriter';

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
      return <div>Getting the database ready, please wait..</div>;
    case DB_STATUS.INITIALISING:
      return <div>Grabbing data from the database, please wait..</div>;
    case DB_STATUS.ERROR:
      return (
        <div>
          There was a problem contacting the database. If there are no known outages, please contact
          IT Support.
        </div>
      );
    default:
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enGB}>
          <StyledApp>
            <HistoryWriter />
            <AppBar />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${URLS.BROWSE}/`} />
              </Route>
              <Route exact path="/index.html">
                <Redirect to={`/${URLS.BROWSE}/`} />
              </Route>
              <Route path={`/${URLS.TASK}/:id`} component={Task} />
              <Route path={`/${URLS.PROFILE}/:id`} component={ProfilesPanel} />
              <Route path={`/${URLS.PROFILE}/`} component={ProfilesPanel} />
              <Route path={`/${URLS.BROWSE}/`} component={MainTabs} />
            </Switch>
          </StyledApp>
        </MuiPickersUtilsProvider>
      );
  }
};
