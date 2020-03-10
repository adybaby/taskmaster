import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import * as Stacked from './StackedResourceChart';
import * as Gantt from './GanttResourceChart';
import styles from '../../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));

export const ChartPanel = () => {
  const classes = useStyles();

  const [listIndex, setListIndex] = React.useState(5);
  const [rgOpen, setRgOpen] = React.useState(true);
  const [rsOpen, setRsOpen] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setListIndex(index);
  };

  const handleRsClicked = () => {
    setRsOpen(!rsOpen);
  };

  const handleRgClicked = () => {
    setRgOpen(!rgOpen);
  };

  const LiBtn = ({ label, val }) => (
    <ListItem
      button
      selected={listIndex === val}
      onClick={event => handleListItemClick(event, val)}
      className={classes.chartListItem}
    >
      <ListItemText primary={label} />
    </ListItem>
  );

  const LiFldr = ({ label, handleClick, open }) => (
    <ListItem button onClick={handleClick}>
      <ListItemText primary={label} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  return (
    <div className={classes.chartPanelContainer}>
      <div className={classes.chartList}>
        <List component="nav" aria-label="charts list navigation">
          <LiFldr label="Resources (Gantt)" handleClick={handleRgClicked} open={rgOpen} />
          <Collapse in={rgOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <LiBtn label="Vacancies" val={1} />
              <LiBtn label="Stated Availability" val={2} />
              <LiBtn label="Actual Availability" val={3} />
              <LiBtn label="Signed Up" val={4} />
              <LiBtn label="Shortfall" val={5} />
              <LiBtn label="Excess" val={6} />
            </List>
          </Collapse>
          <LiFldr label="Resources (Stacked)" handleClick={handleRsClicked} open={rsOpen} />
          <Collapse in={rsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <LiBtn label="Vacancies" val={7} />
              <LiBtn label="Stated Availability" val={8} />
              <LiBtn label="Actual Availability" val={9} />
              <LiBtn label="Signed Up" val={10} />
              <LiBtn label="Shortfall" val={11} />
              <LiBtn label="Excess" val={12} />
            </List>
          </Collapse>
        </List>
      </div>
      <div className={classes.chart}>
        {listIndex === 1 ? <Gantt.VacancyChart /> : null}
        {listIndex === 2 ? <Gantt.AvailabilityChart /> : null}
        {listIndex === 3 ? <Gantt.ActualAvailabilityChart /> : null}
        {listIndex === 4 ? <Gantt.SignedUpChart /> : null}
        {listIndex === 5 ? <Gantt.ShortfallChart /> : null}
        {listIndex === 6 ? <Gantt.ExcessChart /> : null}
        {listIndex === 7 ? <Stacked.VacancyChart /> : null}
        {listIndex === 8 ? <Stacked.AvailabilityChart /> : null}
        {listIndex === 9 ? <Stacked.ActualAvailabilityChart /> : null}
        {listIndex === 10 ? <Stacked.SignedUpChart /> : null}
        {listIndex === 11 ? <Stacked.ShortfallChart /> : null}
        {listIndex === 12 ? <Stacked.ExcessChart /> : null}
      </div>
    </div>
  );
};
