import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useSelector } from 'react-redux';
import { Hint } from 'react-vis';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import { VacancyChart } from './VacancyChart';
import { SignedUpChart } from './SignedUpChart';
import { AvailabilityChart } from './AvailabilityChart';
import { ActualAvailabilityChart } from './ActualAvailabilityChart';
import { ExcessChart } from './ExcessChart';
import { ShortfallChart } from './ShortfallChart';

import { styles } from '../../styles/Styles';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';

import '../../../node_modules/react-vis/dist/style.css';

const useStyles = makeStyles(styles);

export const ChartPanel = () => {
  const classes = useStyles();
  const [listIndex, setListIndex] = useState(1);
  const [ganttFolderOpen, setGanttFolderOpen] = useState(true);
  const [stackedFolderOpen, setStackedFolderOpen] = useState(true);
  const resourceSeriesSets = useSelector(calculateResourceChartData);
  const [dataPoint, setDataPoint] = useState(null);
  const [inspectorPanel, setInspectorPanel] = useState(null);

  const handleListItemClick = (event, index) => {
    setListIndex(index);
  };

  const handleGanttFolderClicked = () => {
    setGanttFolderOpen(!ganttFolderOpen);
  };

  const handleStackedFolderClicked = () => {
    setStackedFolderOpen(!stackedFolderOpen);
  };

  const onValueMouseOver = (dp) => {
    setDataPoint(dp);
  };
  const onValueClick = (dp) => {
    setInspectorPanel(dp.markPanel);
  };

  const onMouseLeave = () => {
    setDataPoint(null);
  };

  const navFolder = (label, handleClick, open) => (
    <ListItem button onClick={handleClick}>
      <ListItemText primary={<b>{label}</b>} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  const navItem = (label, val) => (
    <ListItem
      button
      selected={listIndex === val}
      onClick={(event) => handleListItemClick(event, val)}
      className={classes.chartListItem}
    >
      <ListItemText primary={label} />
    </ListItem>
  );

  const navMenu = (
    <List component="nav" aria-label="charts list navigation">
      {navFolder('Resources (Gantt)', handleGanttFolderClicked, ganttFolderOpen)}
      <Collapse in={ganttFolderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navItem('Vacancies', 1)}
          {navItem('Stated Availability', 2)}
          {navItem('Actual Availability', 3)}
          {navItem('Signed Up', 4)}
          {navItem('Shortfall', 5)}
        </List>
      </Collapse>
      {navFolder('Resources (Stacked)', handleStackedFolderClicked, stackedFolderOpen)}
      <Collapse in={stackedFolderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navItem('Vacancies', 6)}
          {navItem('Stated Availability', 7)}
          {navItem('Actual Availability', 8)}
          {navItem('Signed Up', 9)}
          {navItem('Shortfall', 10)}
          {navItem('Excess', 11)}
        </List>
      </Collapse>
    </List>
  );

  const hint =
    dataPoint !== null ? (
      <Hint align={{ vertical: 'top', horizontal: 'left' }} value={dataPoint}>
        <Paper>{dataPoint.markPanel}</Paper>
      </Hint>
    ) : null;

  const chart = (width) => {
    const props = {
      seriesSets: resourceSeriesSets,
      onValueMouseOver,
      onValueClick,
      onMouseLeave,
      hint,
      width,
      dataPoint,
    };
    switch (listIndex) {
      case 1:
        return <VacancyChart gantt={true} {...props} />;
      case 2:
        return <AvailabilityChart gantt={true} {...props} />;
      case 3:
        return <ActualAvailabilityChart gantt={true} {...props} />;
      case 4:
        return <SignedUpChart gantt={true} {...props} />;
      case 5:
        return <ShortfallChart gantt={true} {...props} />;
      case 6:
        return <VacancyChart {...props} />;
      case 7:
        return <AvailabilityChart {...props} />;
      case 8:
        return <ActualAvailabilityChart {...props} />;
      case 9:
        return <SignedUpChart {...props} />;
      case 10:
        return <ShortfallChart {...props} />;
      case 11:
        return <ExcessChart {...props} />;
      default:
        return 'Error: Could not find selected chart.';
    }
  };

  const inspector = (
    <>
      <div className={classes.leftPadding}>
        <h3>Inspector</h3>
      </div>
      <Divider />
      {inspectorPanel === null ? (
        <div className={classes.leftPadding}>
          <p>Click on a mark in the chart to inspect it.</p>
        </div>
      ) : (
        inspectorPanel
      )}
    </>
  );

  return (
    <div className={classes.contentWithSideBar_Container}>
      <div className={classes.contentWithSideBar_sideBarLeft}>{navMenu}</div>
      <div className={classes.contentWithSideBar_content}>
        {' '}
        <AutoSizer>{({ width }) => <div style={{ width }}>{chart(width)}</div>}</AutoSizer>
      </div>
      <div className={classes.contentWithSideBar_sideBarRight}>{inspector}</div>
    </div>
  );
};
