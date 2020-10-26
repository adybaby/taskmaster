import React, { useEffect, useState, createRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import enGB from 'date-fns/locale/en-GB';
import { Typography, Divider, Button } from '@material-ui/core';
import UseAnimations from 'react-useanimations';
import { SnackbarProvider } from 'notistack';
import { useAuth0 } from './Auth';
import { StyledApp, useStyles } from './styles/Styles';
import { URLS, DB_STATUS, ICONS } from './constants/Constants';
import { initialise } from './state/actions/StateInitialiser';
import { AppBar } from './components/AppBar';
import { MainTabs } from './components/MainTabs';
import { Task } from './components/tasks/Task';
import { setCurrentUser } from './state/actions/CurrentUserActions';
import { syncReduxAndUrl } from './UrlReduxSync';
import * as logger from './util/Logger';
import * as db from './db/Db';
import { User } from './components/users/User';

export const App = () => {
  const classes = useStyles()();
  const { loginWithRedirect } = useAuth0();
  const { loading, user } = useAuth0();
  const dispatch = useDispatch();
  const dbStatus = useSelector((state) => state.dbStatus);
  const currentUser = useSelector((state) => state.currentUser);
  const LOGIN_STATUS = {
    NOT_LOGGED_IN: 'NOT_LOGGED_IN',
    LOGGING_IN: 'LOGGING_IN',
    LOGGED_IN: 'LOGGED_IN',
    ERROR: 'ERROR',
  };
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN);

  const RESET_DB = false;

  useEffect(() => {
    if (dbStatus === DB_STATUS.NOT_INITIALISED) {
      dispatch(initialise());
    }
  }, [dispatch, dbStatus, RESET_DB]);

  useEffect(() => {
    if (dbStatus === DB_STATUS.INITIALISED) {
      syncReduxAndUrl();
    }
  }, [dbStatus]);

  useEffect(() => {
    if (
      !loading &&
      currentUser == null &&
      dbStatus === DB_STATUS.INITIALISED &&
      user &&
      loginStatus === LOGIN_STATUS.NOT_LOGGED_IN
    ) {
      logger.debug('logging in user..', user);
      setLoginStatus(LOGIN_STATUS.LOGGING_IN);
      db.getFullUser(user.sub)
        .then((retrievedUser) => {
          if (retrievedUser == null) {
            db.upsertUser(retrievedUser)
              .then(() => {
                logger.debug('Added a new user to the database', retrievedUser);
              })
              .catch((e) => {
                logger.error('Problem adding this new user to the database');
                logger.error(e);
                setLoginStatus(LOGIN_STATUS.ERROR);
              });
          }
          dispatch(setCurrentUser(retrievedUser));
          setLoginStatus(LOGIN_STATUS.LOGGED_IN);
        })
        .catch((e) => {
          logger.error("Problem retrieving the user's credentials from the database");
          logger.error(e);
          setLoginStatus(LOGIN_STATUS.ERROR);
        });
    }
  }, [dispatch, dbStatus, user, currentUser, loginStatus, loading, LOGIN_STATUS]);

  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const errMsg = (msg, subMsg) => (
    <div className={classes.initErrBg}>
      <div className={classes.initialisingPageContainer}>
        <div className={classes.initiatilisingError}>
          <div className={classes.initialisingIcon}>{ICONS.BIG_ALERT}</div>
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
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button
              color="inherit"
              disableRipple
              size="small"
              disableElevation
              onClick={onClickDismiss(key)}
            >
              {ICONS.CLOSE}
            </Button>
          )}
        >
          <AppBar />
          <Switch>
            <Route exact path="/">
              <Redirect to={`/${URLS.BROWSE}/`} />
            </Route>
            <Route exact path="/index.html">
              <Redirect to={`/${URLS.BROWSE}/`} />
            </Route>
            <Route path={`/${URLS.TASK}/:id`} component={Task} />
            <Route path={`/${URLS.TASK}/`} component={Task} />
            <Route path={`/${URLS.PROFILE}/:id`} component={User} />
            <Route path={`/${URLS.PROFILE}/`} component={User} />
            <Route path={`/${URLS.BROWSE}/`} component={MainTabs} />
          </Switch>
        </SnackbarProvider>
      </StyledApp>
    </MuiPickersUtilsProvider>
  );

  switch (dbStatus) {
    case DB_STATUS.NOT_INITIALISED:
      return null;
    case DB_STATUS.INITIALISING:
      return initMsg('Taskmaster is starting up..');
    case DB_STATUS.OPERATION_COMPLETE:
      return initMsg('Taskmaster has completed the requested data operation.', false);
    case DB_STATUS.ERROR:
      return errMsg(
        'There was a problem contacting the database.',
        'If there are no known outages, please contact IT Support.'
      );
    case DB_STATUS.INITIALISED: {
      switch (loginStatus) {
        case LOGIN_STATUS.NOT_LOGGED_IN:
          return loginMsg();
        case LOGIN_STATUS.LOGGING_IN:
          return initMsg('Taskmaster is logging you in..');
        case LOGIN_STATUS.ERROR:
          return errMsg('There was a problem logging you in.  Please contact IT Support.');
        case LOGIN_STATUS.LOGGED_IN:
          return appMain();
        default:
          return null;
      }
    }
    default:
      return null;
  }
};
