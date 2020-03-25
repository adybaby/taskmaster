import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import * as Resources from './ResourceChart';
import styles from '../../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));

export const ChartPanel = () => {
  const classes = useStyles();

  const [listIndex, setListIndex] = React.useState(1);
  const [rgOpen, setRgOpen] = React.useState(true);
  const [rsOpen, setRsOpen] = React.useState(true);

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
      <ListItemText primary={<b>{label}</b>} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  return (
    <div className={classes.contentWithSideBar_Container}>
      <div className={classes.contentWithSideBar_sideBarLeft}>
        <List component="nav" aria-label="charts list navigation">
          <LiFldr label="Resources (Gantt)" handleClick={handleRgClicked} open={rgOpen} />
          <Collapse in={rgOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <LiBtn label="Vacancies" val={1} />
              <LiBtn label="Stated Availability" val={2} />
              <LiBtn label="Actual Availability" val={3} />
              <LiBtn label="Signed Up" val={4} />
              <LiBtn label="Shortfall" val={5} />
            </List>
          </Collapse>
          <LiFldr label="Resources (Stacked)" handleClick={handleRsClicked} open={rsOpen} />
          <Collapse in={rsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <LiBtn label="Vacancies" val={6} />
              <LiBtn label="Stated Availability" val={7} />
              <LiBtn label="Actual Availability" val={8} />
              <LiBtn label="Signed Up" val={9} />
              <LiBtn label="Shortfall" val={10} />
              <LiBtn label="Excess" val={11} />
            </List>
          </Collapse>
        </List>
      </div>
      <div className={classes.contentWithSideBar_content}>
        {listIndex === 1 ? <Resources.VacancyChart gantt={true} /> : null}
        {listIndex === 2 ? <Resources.AvailabilityChart gantt={true} /> : null}
        {listIndex === 3 ? <Resources.ActualAvailabilityChart gantt={true} /> : null}
        {listIndex === 4 ? <Resources.SignedUpChart gantt={true} /> : null}
        {listIndex === 5 ? <Resources.ShortfallChart gantt={true} /> : null}
        {listIndex === 6 ? <Resources.VacancyChart /> : null}
        {listIndex === 7 ? <Resources.AvailabilityChart /> : null}
        {listIndex === 8 ? <Resources.ActualAvailabilityChart /> : null}
        {listIndex === 9 ? <Resources.SignedUpChart /> : null}
        {listIndex === 10 ? <Resources.ShortfallChart /> : null}
        {listIndex === 11 ? <Resources.ExcessChart /> : null}
      </div>
    </div>
  );
};
