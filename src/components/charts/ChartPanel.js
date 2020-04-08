import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useSelector } from 'react-redux';
import * as ResourceChart from './ResourceChart';
import { styles } from '../../styles/Styles';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';

const useStyles = makeStyles(styles);

export const ChartPanel = () => {
  const classes = useStyles();
  const [listIndex, setListIndex] = useState(1);
  const [rgOpen, setRgOpen] = useState(true);
  const [rsOpen, setRsOpen] = useState(true);
  const resourceSeriesSets = useSelector(calculateResourceChartData);

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
      onClick={(event) => handleListItemClick(event, val)}
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
        {listIndex === 1 ? (
          <ResourceChart.VacancyChart seriesSets={resourceSeriesSets} gantt={true} />
        ) : null}
        {listIndex === 2 ? (
          <ResourceChart.AvailabilityChart seriesSets={resourceSeriesSets} gantt={true} />
        ) : null}
        {listIndex === 3 ? (
          <ResourceChart.ActualAvailabilityChart seriesSets={resourceSeriesSets} gantt={true} />
        ) : null}
        {listIndex === 4 ? (
          <ResourceChart.SignedUpChart seriesSets={resourceSeriesSets} gantt={true} />
        ) : null}
        {listIndex === 5 ? (
          <ResourceChart.ShortfallChart seriesSets={resourceSeriesSets} gantt={true} />
        ) : null}
        {listIndex === 6 ? <ResourceChart.VacancyChart seriesSets={resourceSeriesSets} /> : null}
        {listIndex === 7 ? (
          <ResourceChart.AvailabilityChart seriesSets={resourceSeriesSets} />
        ) : null}
        {listIndex === 8 ? (
          <ResourceChart.ActualAvailabilityChart seriesSets={resourceSeriesSets} />
        ) : null}
        {listIndex === 9 ? <ResourceChart.SignedUpChart seriesSets={resourceSeriesSets} /> : null}
        {listIndex === 10 ? <ResourceChart.ShortfallChart seriesSets={resourceSeriesSets} /> : null}
        {listIndex === 11 ? <ResourceChart.ExcessChart seriesSets={resourceSeriesSets} /> : null}
      </div>
    </div>
  );
};
