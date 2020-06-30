import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enGB from 'date-fns/locale/en-GB';
import { Typography, Divider, Button } from '@material-ui/core';
import UseAnimations from 'react-useanimations';
import { useAuth0 } from './Auth';
import { StyledApp, useStyles } from './styles/Styles';
import { URLS, DB_STATUS, ICONS } from './constants/Constants';
import { initialise } from './state/actions/DataAndFilterLoaderActions';
import { AppBar } from './components/AppBar';
import { MainTabs } from './components/MainTabs';
import { Task } from './components/tasks/Task';
import { ProfilesPanel } from './components/profile/ProfilesPanel';
import { setCurrentUser } from './state/actions/CurrentUserActions';
import { addUser } from './state/actions/UserActions';
import HistoryWriter from './HistoryWriter';
import * as logger from './util/Logger';

export const App = () => {
  const classes = useStyles()();
  const { loginWithRedirect } = useAuth0();
  const { loading, user } = useAuth0();
  const dispatch = useDispatch();
  const dbStatus = useSelector((state) => state.dbStatus);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (dbStatus === DB_STATUS.NOT_INITIALISED) {
      dispatch(initialise());
    }
  }, [dispatch, dbStatus]);

  useEffect(() => {
    if (dbStatus === DB_STATUS.INITIALISED && user) {
      const getUserFromState = () => users.find((u) => u.id === user.sub);
      if (getUserFromState() == null) {
        dispatch(
          addUser(
            user,
            () => {
              logger.log('Added new user..', user);
              logger.log(user);
            },
            (e) => {
              logger.error('Could not add new user..', e, user);
              setLoginError(true);
            }
          )
        );
      }
      if (currentUser == null && !loginError && getUserFromState() != null) {
        dispatch(setCurrentUser(getUserFromState()));
      }
    }
  }, [dispatch, dbStatus, user, loginError, users, currentUser]);

  const errMsg = (msg, subMsg) => (
    <div className={classes.initErrBg}>
      <div className={classes.initialisingPageContainer}>
        <div className={classes.initiatilisingError}>
          <div className={classes.initialisingIcon}>{ICONS.ALERT}</div>
          <Typography variant="h6">{msg}</Typography>
          <br />
          <Typography variant="body2">{subMsg}</Typography>
        </div>
      </div>
    </div>
  );

  const initMsg = (msg, showIcon = true) => (
    <div className={classes.initialisingBg}>
      <div className={classes.initialisingPageContainer}>
        <div className={classes.initiatilising}>
          {showIcon ? (
            <div className={classes.initialisingIcon}>
              <UseAnimations animationKey="loading2" size={56} />
            </div>
          ) : null}
          <Typography variant="h6">{msg}</Typography>
        </div>
      </div>
    </div>
  );

  const loginMsg = () => (
    <div className={classes.initialisingBg}>
      <div className={classes.initialisingPageContainer}>
        <div className={classes.initiatilising}>
          <div className={classes.initialisingIcon}>{ICONS.LOGIN}</div>
          <Typography variant="h6">{'TASKMASTER'}</Typography>
          <Divider />
          <div>
            <Button key="loginbutton" color="inherit" onClick={() => loginWithRedirect()}>
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const appMain = () => (
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

  switch (dbStatus) {
    case DB_STATUS.NOT_INITIALISED:
    case DB_STATUS.INITIALISING:
      return initMsg('Taskmaster is starting up..');
    case DB_STATUS.OPERATION_COMPLETE:
      return initMsg('Taskmaster has completed the requested data operation.', false);
    case DB_STATUS.ERROR:
      return errMsg(
        'There was a problem contacting the database.',
        'If there are no known outages, please contact IT Support.'
      );
    default: {
      if (!user) {
        return loginMsg();
      }
      if (loginError) {
        return errMsg('There was a problem adding you as a user.  Please contact IT Support.');
      }
      if (loading || currentUser === null) {
        return initMsg('Taskmaster is logging you in..');
      }
      return appMain();
    }
  }
};
