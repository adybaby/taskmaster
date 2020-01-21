import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import styles from './styles/Styles';
import AppBar from './components/AppBar';
import TabsBar from './components/TabsBar';
import TaskList from './components/TaskList';
import TaskPanel from './components/TaskPanel';
import ChartPanel from './components/ChartPanel';
import MapPanel from './components/MapPanel';
import ProfilePanel from './components/ProfilePanel';

/**
 * TODO - Add in URL params for search tabs and values, to bookmark tabs in right place
 * fix that filter and sort bar is not present when returning to search area
 */

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
            <Route path="/task/:id" component={TaskPanel} />
            <Route path="/profile/:id" component={ProfilePanel} />
            <Route path="/">
              <TabsBar />
              <Switch>
                <Route path="/map" component={MapPanel} />
                <Route path="/charts" component={ChartPanel} />
                <Route exact path="/" component={TaskList} />
              </Switch>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
