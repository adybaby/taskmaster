import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Drawer, Button, Typography } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import { styles } from '../../styles/Styles';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';
import '../../../node_modules/react-vis/dist/style.css';
import { ChartMenuGroup } from './ChartMenuGroup';
import { chartGroups } from './ChartGroups';

const useStyles = makeStyles(styles);

export const ChartPanel = () => {
  const classes = useStyles();
  const resourceSeriesSets = useSelector(calculateResourceChartData);
  const [dataPoint, setDataPoint] = useState(null);
  const [selectedChart, setSelectedChart] = useState(chartGroups[0].charts[0]);
  const [inspectorPanel, setInspectorPanel] = useState(null);
  const [inspectorDrawerVisible, setInspectorDrawerVisible] = useState(false);
  const [chartSelectDrawerVisible, setChartSelectDrawerVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);

  const handleChartMenuItemClicked = (chart) => {
    setSelectedChart(chart);
    setChartSelectDrawerVisible(false);
  };

  const chart = (width) => {
    const props = {
      seriesSets: resourceSeriesSets,
      onValueMouseOver: (dp, event) => {
        setMousePosition({ x: event.event.clientX, y: event.event.clientY });
        setDataPoint(dp);
      },
      onValueClick: (dp) => {
        setInspectorPanel(dp.markPanel);
        setInspectorDrawerVisible(true);
      },
      onValueMouseOut: () => {
        setDataPoint(null);
      },
      width,
      dataPoint,
    };
    return React.createElement(selectedChart.chart, { gantt: selectedChart.gantt, ...props }, null);
  };

  const chartMenuBody = (
    <List component="nav" aria-label="charts list navigation">
      {chartGroups.map((chartGroup, index) => (
        <ChartMenuGroup
          key={index}
          title={chartGroup.groupTitle}
          charts={chartGroup.charts}
          handleChartMenuItemClicked={handleChartMenuItemClicked}
          startOpen={chartGroup.startOpen}
          selectedChart={selectedChart}
        />
      ))}
    </List>
  );

  const inspectorPopUp =
    dataPoint !== null && mousePosition !== null ? (
      <div
        style={{ left: mousePosition.x + 10, top: mousePosition.y + 10 }}
        className={classes.inspectorToolTip}
      >
        <Paper>{dataPoint.markPanel}</Paper>
      </div>
    ) : null;

  const inspectorSideBar = (
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

  const chartDrawer = (content, anchor, openProp, onClose, onClick) => (
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

  const chartMenuDrawerButton = (
    <Button className={classes.chartSelectButton} onClick={() => setChartSelectDrawerVisible(true)}>
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );

  return (
    <div className={classes.chartsLayoutContainer}>
      {inspectorPopUp}
      <div className={classes.chartMenuSideBar}>{chartMenuBody}</div>
      <div className={classes.chartLayoutBody}>
        <div className={classes.chartHeader}>
          {chartMenuDrawerButton}
          <Typography>
            <b>{selectedChart.chartTitle}</b>
          </Typography>
        </div>
        <AutoSizer>{({ width }) => <div style={{ width }}>{chart(width)}</div>}</AutoSizer>
      </div>
      <div className={classes.inspectorSideBar}>{inspectorSideBar}</div>
      {chartDrawer(chartMenuBody, 'left', chartSelectDrawerVisible, () =>
        setChartSelectDrawerVisible(false)
      )}
      {chartDrawer(
        inspectorPanel,
        'right',
        inspectorDrawerVisible,
        () => setInspectorDrawerVisible(false),
        () => setInspectorDrawerVisible(false)
      )}
    </div>
  );
};
