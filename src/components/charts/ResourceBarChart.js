import React, { useEffect, useCallback } from 'react';
import {
  XYPlot,
  VerticalRectSeries,
  VerticalBarSeries,
  ContinuousColorLegend,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend,
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import { Typography } from '@material-ui/core';
import { Inspector } from './Inspector';
import { useStyles, typographyVariant, CHART_COLORS } from '../../styles/Styles';
import { CHART_TYPES } from '../../constants/Constants';

const ONE_DAY = 86400000;

export const ResourceBarChart = ({
  chart,
  seriesSet,
  skillsAndColors,
  inspectorData,
  width,
  dataPoint,
  onValueMouseOver,
  onValueClick,
  onValueMouseOut,
  setDownloadEnabled,
}) => {
  const classes = useStyles()();
  const variant = typographyVariant.chart;
  const isGantt = chart.type === CHART_TYPES.BAR_GANTT.id;
  const orderedSeriesSet = { ...seriesSet };
  orderedSeriesSet.series = [...orderedSeriesSet.series];
  const orderedSkillsAndColors = [...skillsAndColors];
  const orderedInspectorData = { ...inspectorData };
  orderedInspectorData.series = [...orderedInspectorData.series];

  // reverse order as gantt chart populates from bottom to top
  if (isGantt) {
    orderedSeriesSet.series.reverse();
    orderedSkillsAndColors.reverse();
    orderedInspectorData.series.reverse();
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const orderedSkills = orderedSkillsAndColors.map((skill) => capitalize(skill.title));

  const makeLegend = () =>
    isGantt ? (
      <div className={classes.continuousChartLegend}>
        <ContinuousColorLegend
          startColor={CHART_COLORS.MIN}
          endColor={CHART_COLORS.MAX}
          startTitle={orderedSeriesSet.min}
          midTitle={Math.floor(orderedSeriesSet.max / 2)}
          endTitle={orderedSeriesSet.max}
        />
      </div>
    ) : (
      <DiscreteColorLegend
        className={classes.discreteChartLegend}
        orientation="horizontal"
        items={orderedSkillsAndColors}
      />
    );

  const makeSeriesData = (series, skillsIndex) => {
    return series.data.map((dataIn) => {
      const y = isGantt ? skillsIndex + 0.9 : dataIn.y;
      const data = {
        x: dataIn.x + ONE_DAY - 1,
        y,
        inspector: (
          <Inspector
            inspectorData={orderedInspectorData.series[skillsIndex].data.find(
              (ref) => ref.x === dataIn.x
            )}
            skillTitle={series.label}
            total={dataIn.y}
            daySummary={chart.daySummary}
          />
        ),
      };
      if (isGantt) {
        Object.assign(data, {
          color:
            dataPoint !== null && dataPoint.x === dataIn.x && dataPoint.y === skillsIndex + 0.9
              ? -99
              : dataIn.y,
          x0: dataIn.x,
          y0: skillsIndex + 0.1,
        });
      }
      return data;
    });
  };

  const makeSeries = (series, skillsIndex) => {
    let data = makeSeriesData(series, skillsIndex);
    if (data.length === 0) return null;
    if (data.length === 1 && !isGantt) {
      // this to deal with a react-viz "feature" where time axis require >1 x entries
      data = [{ x: data[0].x - ONE_DAY, y: 0 }, data[0], { x: data[0].x + ONE_DAY, y: 0 }];
    }

    const props = {
      key: skillsIndex,
      data,
      onValueMouseOver,
      onValueMouseOut,
      onValueClick,
    };

    return isGantt ? (
      <VerticalRectSeries {...props} />
    ) : (
      <VerticalBarSeries color={series.color} {...props} />
    );
  };

  const makeChart = () => {
    let props = {
      xType: 'time',
      height: 800,
      margin: { top: 20, right: 20, bottom: 70 },
    };

    if (isGantt) {
      props = {
        ...props,
        margin: { ...props.margin, left: 80 },
        colorRange: [CHART_COLORS.HIGHLIGHTED, CHART_COLORS.MIN, CHART_COLORS.MAX],
        colorDomain: [-99, orderedSeriesSet.min, orderedSeriesSet.max],
      };
    } else {
      props = { ...props, stackBy: 'y' };
    }

    const ganttYTickValues = [...Array(orderedSkills.length).keys()].map((i) => i + 0.5);

    return (
      <XYPlot width={width} {...props}>
        <HorizontalGridLines tickValues={isGantt ? ganttYTickValues : undefined} />
        <XAxis tickLabelAngle={-45} />
        {isGantt ? (
          <YAxis tickFormat={(t, i) => orderedSkills[i]} tickValues={ganttYTickValues} />
        ) : (
          <YAxis tickFormat={(t) => (Math.round(t) === t ? t : '')} />
        )}
        {orderedSeriesSet.series.map((s, index) => makeSeries(s, index, isGantt))}
      </XYPlot>
    );
  };

  const seriesHasData = useCallback(
    () =>
      orderedSeriesSet.series.reduce((accumulator, series) => accumulator + series.data.length, 0) >
      0,
    [orderedSeriesSet]
  );

  useEffect(() => {
    setDownloadEnabled(seriesHasData);
  }, [seriesHasData, setDownloadEnabled]);

  return (
    <>
      {seriesHasData() ? (
        <>
          {makeChart()}
          {makeLegend()}
        </>
      ) : (
        <div className={classes.noChartsMessage}>
          <Typography variant={variant.prompt}>
            No data to display. Please refine your date range.
          </Typography>
        </div>
      )}
    </>
  );
};
