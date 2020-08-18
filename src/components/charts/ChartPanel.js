import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { Drawer, Button, Typography, Hidden, Tooltip } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import FileSaver from 'file-saver';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { setSelectedChart } from '../../state/actions/SelectedChartActions';
import {
  ICONS,
  UPDATE_STATUS,
  FILTER_IDS,
  DATE_RANGE,
  RESOURCE_CHART_DEFINITIONS as chartGroups,
} from '../../constants/Constants';
import { ResourceBarChart } from './ResourceBarChart';
import '../../../node_modules/react-vis/dist/style.css';
import { Hint, HINT_IDS } from '../hints/Hint';
import * as db from '../../db/Db';
import * as logger from '../../util/Logger';
import { GeneralError } from '../GeneralError';

const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
};

const ChartMenuGroup = ({
  chartGroup: { label, startOpen, charts },
  handleChartMenuItemClicked,
  selectedChart,
}) => {
  const classes = useStyles()();
  const [folderOpen, setFolderOpen] = useState(startOpen);

  const onFolderClick = () => {
    setFolderOpen(!folderOpen);
  };

  return (
    <>
      <ListItem className={classes.chartMenuFolder} button onClick={onFolderClick}>
        <Typography className={classes.chartListItem}>
          <b>{label}</b>
        </Typography>
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
            >
              <Typography className={classes.chartListItem} noWrap={true}>
                {chart.title}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const ChartPanel = () => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const variant = typographyVariant.chart;

  const selectedChart = useSelector((state) => state.selectedChart);
  const filterParams = useSelector((state) => state.filterParams);

  const [updateStatus, setUpdateStatus] = useState(null);

  const [resourceSeriesSets, setResourceSeriesSets] = useState(null);
  const [dataPoint, setDataPoint] = useState(null);
  const [inspectorPanel, setInspectorPanel] = useState(null);

  const [inspectorDrawerVisible, setInspectorDrawerVisible] = useState(false);
  const [chartSelectDrawerVisible, setChartSelectDrawerVisible] = useState(false);

  const [mousePosition, setMousePosition] = useState(0);
  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  const [errorMsg, setErrorMsg] = useState(null);

  const isMountedRef = useIsMountedRef();

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

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [filterParams]);

  useEffect(() => {
    const getChartFilters = () => {
      const chartRangeParams = filterParams[FILTER_IDS.CHART_RANGE];
      return {
        filterSkills: filterParams[FILTER_IDS.SKILLS_RANGE]
          .filter((param) => param.checked)
          .map((param) => param.id),
        filterDateRange:
          chartRangeParams[0] === DATE_RANGE.CUSTOM_DATES.id
            ? { startDate: chartRangeParams[1], endDate: chartRangeParams[2] }
            : DATE_RANGE[chartRangeParams[0]].range,
      };
    };

    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      db.getChart(getChartFilters())
        .then((results) => {
          if (isMountedRef.current) {
            setResourceSeriesSets(results);
            setUpdateStatus(UPDATE_STATUS.UPDATED);
          }
        })
        .catch((e) => {
          logger.error(e);
          if (isMountedRef.current) {
            setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }
        });
    }
  }, [resourceSeriesSets, updateStatus, filterParams, isMountedRef]);

  const handleChartMenuItemClicked = (chart) => {
    dispatch(setSelectedChart(chart));
    setChartSelectDrawerVisible(false);
  };

  const getTimeAxisForSeries = (series) => {
    const firstDateInMs = series.reduce((soonest, seriesEntry) => {
      const data = seriesEntry.data;

      if (data.length === 0) {
        return soonest;
      }

      if (soonest === 0) {
        return data[0].x;
      }

      return data[0].x < soonest ? data[0].x : soonest;
    }, 0);

    const lastDateInMs = series.reduce((latest, seriesEntry) => {
      const data = seriesEntry.data;

      if (data.length === 0) {
        return latest;
      }

      return data[data.length - 1].x > latest ? data[data.length - 1].x : latest;
    }, 0);

    const timeAxis = [];

    for (
      let dayDate = new Date(firstDateInMs);
      dayDate.getTime() <= lastDateInMs;
      dayDate.setDate(dayDate.getDate() + 1)
    ) {
      timeAxis.push(dayDate.getTime());
    }

    return timeAxis;
  };

  const handleDownloadClicked = () => {
    const series = resourceSeriesSets[selectedChart.seriesKey].series;
    const timeAxis = getTimeAxisForSeries(series);

    const dayCount = timeAxis.length;
    const lines = [];

    const colHeadings = ['Skill Group'];
    for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
      colHeadings.push(formatDate(new Date(timeAxis[dayIndex])));
    }
    lines.push(colHeadings.join(','));

    series.forEach((thisSeries) => {
      const line = [thisSeries.label];

      for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
        const currentDayInMs = timeAxis[dayIndex];
        const seriesEntryForDay = thisSeries.data.find((data) => data.x === currentDayInMs);
        line.push(seriesEntryForDay != null ? seriesEntryForDay.y : 0);
      }

      lines.push(line.join(','));
    });

    const chartDataStr = lines.join('\n');
    const blob = new Blob([chartDataStr], { type: 'text/plain;charset=utf-8' });

    FileSaver.saveAs(blob, `taskmaster_${selectedChart.seriesKey}.csv`);
  };

  const resourceChart = (width) => {
    switch (updateStatus) {
      case UPDATE_STATUS.UPDATING:
        return (
          <div className={classes.generalMessage}>
            <Typography variant={variant.prompt}>Updating chart..</Typography>
          </div>
        );
      case UPDATE_STATUS.UPDATED:
        return (
          <ResourceBarChart
            chart={selectedChart}
            seriesSet={resourceSeriesSets[selectedChart.seriesKey]}
            skillsAndColors={resourceSeriesSets.skillsAndColors}
            inspectorData={resourceSeriesSets.inspectorData}
            width={width}
            dataPoint
            onValueMouseOver={(hoveredDataPoint, { event }) => {
              setMousePosition({ x: event.clientX, y: event.clientY });
              setDataPoint(hoveredDataPoint);
            }}
            onValueClick={(clickedDataPoint) => {
              setInspectorPanel(clickedDataPoint.inspector);
              setInspectorDrawerVisible(true);
            }}
            onValueMouseOut={() => {
              setDataPoint(null);
            }}
            setDownloadEnabled={setDownloadEnabled}
          />
        );
      case UPDATE_STATUS.ERROR:
        return (
          <GeneralError
            errorMsg="There was an error retrieving the chart"
            errorDetailsMsg={errorMsg}
          />
        );
      default:
        return null;
    }
  };

  const chartMenuBody = () => (
    <List className={classes.chartMenuBody} component="nav" aria-label="charts list navigation">
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
        <Paper>{dataPoint.inspector}</Paper>
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

  const chartSelectButton = () => (
    <Tooltip title="Select Chart">
      <Button
        className={classes.chartSelectButton}
        onClick={() => setChartSelectDrawerVisible(true)}
      >
        {ICONS.MENU}
      </Button>
    </Tooltip>
  );

  const downloadButton = () => (
    <Tooltip title="DOWNLOAD CSV">
      <span className={classes.chartDownloadButton}>
        <Button
          disabled={!downloadEnabled}
          className={classes.chartDownloadButton}
          onClick={handleDownloadClicked}
        >
          {ICONS.DOWNLOAD}
          <span className={classes.hidingLabel}>
            <b>DOWNLOAD</b>
          </span>
        </Button>
      </span>
    </Tooltip>
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
            <Hint id={HINT_IDS.CHARTS} className={classes.chartHint} />
            <div className={classes.chartHeading}>
              {chartSelectButton()}
              <Typography classes={{ root: classes.chartHeadingLabel }} variant={variant.title}>
                <b>{selectedChart.title}</b>
              </Typography>
              {downloadButton()}
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
