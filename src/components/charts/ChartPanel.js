import React, { useState, useEffect } from 'react';
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
import { Drawer, Button, Typography, Hidden } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import { styles, typographyVariant } from '../../styles/Styles';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';
import { chartGroups } from '../../data/charts/ResourceChartDefinitions';
import { ResourceBarChart } from './ResourceBarChart';
import '../../../node_modules/react-vis/dist/style.css';

const useStyles = makeStyles(styles);

const ChartMenuGroup = ({
  chartGroup: { label, startOpen, charts },
  handleChartMenuItemClicked,
  selectedChart,
}) => {
  const classes = useStyles();
  const [folderOpen, setFolderOpen] = useState(startOpen);

  const onFolderClick = () => {
    setFolderOpen(!folderOpen);
  };

  return (
    <>
      <ListItem className={classes.chartMenuFolder} button onClick={onFolderClick}>
        <ListItemText primary={<b>{label}</b>} />
        {folderOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={folderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {charts.map((chart, index) => (
            <ListItem
              button
              key={index}
              selected={chart === selectedChart}
              onClick={() => handleChartMenuItemClicked(chart)}
              className={classes.chartListItem}
            >
              <ListItemText primary={chart.title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const ChartPanel = () => {
  const classes = useStyles();
  const variant = typographyVariant.chart;
  const resourceSeriesSets = useSelector(calculateResourceChartData);
  const [dataPoint, setDataPoint] = useState(null);
  const [selectedChart, setSelectedChart] = useState(chartGroups[0].charts[0]);
  const [inspectorPanel, setInspectorPanel] = useState(null);
  const [inspectorDrawerVisible, setInspectorDrawerVisible] = useState(false);
  const [chartSelectDrawerVisible, setChartSelectDrawerVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  const updateWindowDimensions = () => {
    setWinHeight(window.innerHeight);
    setWinWidth(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener('resize', updateWindowDimensions);
    },
    []
  );

  const handleChartMenuItemClicked = (chart) => {
    setSelectedChart(chart);
    setChartSelectDrawerVisible(false);
  };

  const resourceChart = (width) => (
    <ResourceBarChart
      chart={selectedChart}
      seriesSet={resourceSeriesSets[selectedChart.seriesKey]}
      skillsAndColors={resourceSeriesSets.skillsAndColors}
      refs={resourceSeriesSets.refs}
      width={width}
      dataPoint
      onValueMouseOver={(dp, { event }) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        setDataPoint(dp);
      }}
      onValueClick={(dp) => {
        setInspectorPanel(dp.markPanel);
        setInspectorDrawerVisible(true);
      }}
      onValueMouseOut={() => {
        setDataPoint(null);
      }}
    />
  );

  const chartMenuBody = () => (
    <List component="nav" aria-label="charts list navigation">
      {chartGroups.map((chartGroup, index) => (
        <ChartMenuGroup
          key={index}
          chartGroup={chartGroup}
          handleChartMenuItemClicked={handleChartMenuItemClicked}
          selectedChart={selectedChart}
        />
      ))}
    </List>
  );

  const inspectorPopUp = () => {
    if (dataPoint === null || mousePosition === null) return null;

    const horizontalPos =
      mousePosition.x < winWidth / 2
        ? { left: mousePosition.x + 30 }
        : { right: winWidth - mousePosition.x + 10 };
    const verticalPos =
      mousePosition.y < winHeight / 2
        ? { top: mousePosition.y + 30 }
        : { bottom: winHeight - mousePosition.y + 10 };

    return (
      <div
        className={classes.inspectorToolTip}
        style={{
          ...horizontalPos,
          ...verticalPos,
        }}
      >
        <Paper>{dataPoint.markPanel}</Paper>
      </div>
    );
  };

  const chartDrawer = (content, anchor, openProp, onClose, onClick) => (
    <Drawer variant="temporary" anchor={anchor} open={openProp} onClose={onClose} onClick={onClick}>
      <div className={classes.drawerBody}>
        {content}
        <div className={classes.drawerControls}>
          <Button
            color="primary"
            onClick={onClose}
            fullWidth
            classes={{ root: classes.closeDrawerButton }}
          >
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );

  const chartMenuDrawerButton = () => (
    <Button className={classes.chartSelectButton} onClick={() => setChartSelectDrawerVisible(true)}>
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );

  const nonLayoutComponents = () => (
    <>
      <Hidden xsDown>{inspectorPopUp()}</Hidden>
      {chartDrawer(chartMenuBody(), 'left', chartSelectDrawerVisible, () =>
        setChartSelectDrawerVisible(false)
      )}
      {chartDrawer(
        inspectorPanel,
        'right',
        inspectorDrawerVisible,
        () => setInspectorDrawerVisible(false),
        () => setInspectorDrawerVisible(false)
      )}
    </>
  );

  return (
    <>
      {nonLayoutComponents()}
      <div className={classes.chartsLayoutContainer}>
        <div className={classes.chartMenuSideBar}>{chartMenuBody()}</div>
        <div className={classes.chartLayoutBody}>
          <div className={classes.chartHeadingContainer}>
            <div className={classes.chartHeading}>
              {chartMenuDrawerButton()}
              <Typography variant={variant.title}>
                <b>{selectedChart.title}</b>
              </Typography>
            </div>
            <div className={classes.chartInfo}>
              <Typography variant={variant.info}>{selectedChart.info}</Typography>
            </div>
          </div>
          <AutoSizer>
            {({ width }) => <div style={{ width }}>{resourceChart(width)}</div>}
          </AutoSizer>
        </div>
      </div>
    </>
  );
};
