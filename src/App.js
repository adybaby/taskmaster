import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './styles/Styles';
import AppBar from './components/AppBar';
import BrowsePanel from './components/BrowsePanel';
import TaskPanel from './components/taskpanels/TaskPanel';
import ProfilePanel from './components/ProfilePanel';
import * as URLS from './constants/Urls';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();
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
            <Route path={`/${URLS.BROWSE}/:id`} component={BrowsePanel} />
            <Route>
              <Redirect to={`/${URLS.BROWSE}/${URLS.ALL}`} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
