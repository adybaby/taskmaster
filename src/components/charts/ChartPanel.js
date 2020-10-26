import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Tooltip } from '@material-ui/core';
import { AutoSizer } from 'react-virtualized';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { setSelectedChart } from '../../state/actions/SelectedChartActions';
import { ICONS, UPDATE_STATUS } from '../../constants/Constants';
import { Hint, HINT_IDS } from '../hints/Hint';
import * as db from '../../db/Db';
import * as logger from '../../util/Logger';
import { GeneralError } from '../GeneralError';
import { DownloadButton } from './DownloadButton';
import { ChartMenu } from './ChartMenu';
import { ChartWithInspector } from './ChartWithInspector';
import { ResourceGanttChart } from './ResourceGanttChart';
import { ResourceStackedChart } from './ResourceStackedChart';
import { CHART_TYPES } from '../../constants/chart/ResourceChartDefinitions';
import {
  getChartDateRangeFilterParams,
  getChartSkillsFilterParams,
} from '../../state/selectors/FilterSelector';

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

export const ChartPanel = () => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const variant = typographyVariant.chart;

  const selectedChart = useSelector((state) => state.selectedChart);
  const filterDateRange = useSelector(getChartDateRangeFilterParams);
  const selectedSkillInfo = useSelector(getChartSkillsFilterParams);

  const [updateStatus, setUpdateStatus] = useState(null);

  const [chartData, setChartData] = useState(null);

  const [chartSelectDrawerVisible, setChartSelectDrawerVisible] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [filterDateRange]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      db.getChart({ filterDateRange })
        .then((results) => {
          if (isMountedRef.current) {
            setChartData(results);
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
  }, [chartData, updateStatus, filterDateRange, isMountedRef]);

  const handleChartMenuItemClicked = (chart) => {
    dispatch(setSelectedChart(chart));
    setChartSelectDrawerVisible(false);
  };

  const chart = (width) => {
    switch (updateStatus) {
      case UPDATE_STATUS.UPDATING:
        return (
          <div className={classes.generalMessage}>
            <Typography variant={variant.prompt}>Updating chart..</Typography>
          </div>
        );
      case UPDATE_STATUS.UPDATED: {
        if (chartData != null && chartData.length > 0) {
          setDownloadEnabled(true);
          const chartProps = {
            selectedChart,
            chartData,
            width,
            selectedSkillInfo,
          };
          return (
            <ChartWithInspector>
              {(propsForInspector) =>
                selectedChart.type === CHART_TYPES.BAR_GANTT.id ? (
                  <ResourceGanttChart {...chartProps} {...propsForInspector} />
                ) : (
                  <ResourceStackedChart {...chartProps} {...propsForInspector} />
                )
              }
            </ChartWithInspector>
          );
        }
        setDownloadEnabled(false);
        return (
          <div className={classes.generalError}>
            <Typography variant={variant.prompt}>
              No data to display. Please refine your filters.
            </Typography>
          </div>
        );
      }
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

  return (
    <>
      <div className={classes.chartsLayoutContainer}>
        <ChartMenu
          open={chartSelectDrawerVisible}
          selectedChart={selectedChart}
          onClose={() => setChartSelectDrawerVisible(false)}
          onClick={handleChartMenuItemClicked}
        />

        <div className={classes.chartLayoutBody}>
          <div className={classes.chartHeadingContainer}>
            <Hint id={HINT_IDS.CHARTS} className={classes.chartHint} />

            <div className={classes.chartHeading}>
              <Tooltip title="Select Chart">
                <Button
                  className={classes.chartSelectButton}
                  onClick={() => setChartSelectDrawerVisible(true)}
                >
                  {ICONS.MENU}
                </Button>
              </Tooltip>
              <Typography classes={{ root: classes.chartHeadingLabel }} variant={variant.title}>
                <b>{selectedChart.title}</b>
              </Typography>
              {updateStatus === UPDATE_STATUS.UPDATED ? (
                <DownloadButton
                  selectedChart={selectedChart}
                  selectedSkillInfo={selectedSkillInfo}
                  chartData={chartData}
                  disabled={!downloadEnabled}
                />
              ) : null}
            </div>

            <div className={classes.chartInfo}>
              <Typography variant={variant.info}>{selectedChart.info}</Typography>
            </div>
          </div>
          <AutoSizer>{({ width }) => <div style={{ width }}>{chart(width)}</div>}</AutoSizer>
        </div>
      </div>
    </>
  );
};
