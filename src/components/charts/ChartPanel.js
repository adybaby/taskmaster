import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Drawer, Button, Typography } from '@material-ui/core';
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
  const [inspectorDrawerVisible, setInspectorDrawerVisible] = useState(false);
  const [chartSelectDrawerVisible, setChartSelectDrawerVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);

  const titles = [
    'None',
    'Vacancies',
    'Stated Availability',
    'Actual Availability',
    'Signed Up',
    'Shortfall',
    'Vacancies',
    'Stated Availability',
    'Actual Availability',
    'Signed Up',
    'Shortfall',
    'Excess',
  ];

  const handleListItemClick = (event, index) => {
    setListIndex(index);
    setChartSelectDrawerVisible(false);
  };

  const handleGanttFolderClicked = () => {
    setGanttFolderOpen(!ganttFolderOpen);
  };

  const handleStackedFolderClicked = () => {
    setStackedFolderOpen(!stackedFolderOpen);
  };

  const onValueMouseOver = (dp, event) => {
    setMousePosition({ x: event.event.clientX, y: event.event.clientY });
    setDataPoint(dp);
  };
  const onValueClick = (dp) => {
    setInspectorPanel(dp.markPanel);
    setInspectorDrawerVisible(true);
  };

  const onValueMouseOut = () => {
    setDataPoint(null);
  };

  const navFolder = (label, handleClick, open) => (
    <ListItem button onClick={handleClick}>
      <ListItemText primary={<b>{label}</b>} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  const navItem = (label, index) => (
    <ListItem
      button
      key={index}
      selected={listIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
      className={classes.chartListItem}
    >
      <ListItemText primary={label} />
    </ListItem>
  );

  const navItems = (first, last) => {
    const list = [];
    for (let index = first; index <= last; index++) {
      list.push(navItem(titles[index], index));
    }
    return list;
  };

  const navMenu = (
    <List component="nav" aria-label="charts list navigation">
      {navFolder('Resources (Gantt)', handleGanttFolderClicked, ganttFolderOpen)}
      <Collapse in={ganttFolderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navItems(1, 5)}
        </List>
      </Collapse>
      {navFolder('Resources (Stacked)', handleStackedFolderClicked, stackedFolderOpen)}
      <Collapse in={stackedFolderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navItems(6, 11)}
        </List>
      </Collapse>
    </List>
  );

  const hint =
    dataPoint !== null && mousePosition !== null ? (
      <div
        style={{ left: mousePosition.x + 10, top: mousePosition.y + 10 }}
        className={classes.inspectorToolTip}
      >
        <Paper>{dataPoint.markPanel}</Paper>
      </div>
    ) : null;

  const chart = (width) => {
    const props = {
      seriesSets: resourceSeriesSets,
      onValueMouseOver,
      onValueClick,
      onValueMouseOut,
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
      <div className={classes.inspectorHeading}>
        <Typography>
          <b>Inspector</b>
        </Typography>
      </div>
      {inspectorPanel === null ? (
        <div className={classes.inspectorBody}>
          <Typography variant="body1">Click on a mark in the chart to inspect it.</Typography>
        </div>
      ) : (
        inspectorPanel
      )}
    </>
  );

  const drawer = (content, anchor, openProp, onClose, onClick) => (
    <Drawer
      className={classes.chartDrawer}
      anchor={anchor}
      open={openProp}
      onClose={onClose}
      onClick={onClick}
    >
      <div className={classes.chartMenu}>{content}</div>
      <div className={classes.drawerControls}>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Drawer>
  );

  const chartSelectButton = (
    <Button className={classes.chartSelectButton} onClick={() => setChartSelectDrawerVisible(true)}>
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );

  return (
    <div className={classes.chartsLayoutContainer}>
      {hint}
      <div className={classes.chartMenuSideBar}>{navMenu}</div>
      <div className={classes.chartLayoutBody}>
        <div className={classes.chartHeader}>
          {chartSelectButton}
          <Typography>
            <b>{titles[listIndex]}</b>
          </Typography>
        </div>
        <AutoSizer>{({ width }) => <div style={{ width }}>{chart(width)}</div>}</AutoSizer>
      </div>
      <div className={classes.inspectorSideBar}>{inspector}</div>
      {drawer(navMenu, 'left', chartSelectDrawerVisible, () => setChartSelectDrawerVisible(false))}
      {drawer(
        inspector,
        'right',
        inspectorDrawerVisible,
        () => setInspectorDrawerVisible(false),
        () => setInspectorDrawerVisible(false)
      )}
    </div>
  );
};
