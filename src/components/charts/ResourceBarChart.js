import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Inspector } from './Inspector';
import { styles, typographyVariant, CHART_COLORS } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const ResourceBarChart = ({
  seriesSets,
  seriesKey,
  totalsTitle,
  positive,
  gantt,
  onValueMouseOver,
  onValueMouseOut,
  onValueClick,
  width,
  dataPoint,
}) => {
  const classes = useStyles();
  const variant = typographyVariant.chart;
  const seriesSet = seriesSets[seriesKey];
  const skills = seriesSets.skillsAndColors.map((s) => s.title);
  const { refs } = seriesSets;

  const makeLegend = () =>
    gantt ? (
      <div className={classes.continuousChartLegend}>
        <ContinuousColorLegend
          startColor={CHART_COLORS.MIN}
          endColor={CHART_COLORS.MAX}
          startTitle={seriesSet.min}
          midTitle={Math.floor(seriesSet.max / 2)}
          endTitle={seriesSet.max}
        />
      </div>
    ) : (
      <DiscreteColorLegend
        className={classes.discreteChartLegend}
        orientation="horizontal"
        items={seriesSets.skillsAndColors}
      />
    );

  const makeSeriesData = (series, skillsIndex) => {
    const getStackedY = (y) => {
      if (typeof positive === 'undefined') {
        return y;
      }
      if (positive) {
        return y <= 0 ? 0 : y;
      }
      return y > 0 ? 0 : Math.abs(y);
    };

    return series.data.map((dataIn) => {
      const y = gantt ? skillsIndex + 0.9 : getStackedY(dataIn.y);
      const data = {
        x: dataIn.x,
        y,
        markPanel: (
          <Inspector
            dayRefData={refs[skillsIndex].data.find((ref) => ref.x === dataIn.x)}
            skillTitle={series.label}
            total={dataIn.y}
            totalsTitle={totalsTitle}
          />
        ),
      };
      if (gantt)
        Object.assign(data, {
          color:
            dataPoint !== null && dataPoint.x === dataIn.x && dataPoint.y === skillsIndex + 0.9
              ? -99
              : dataIn.y,
          x0: dataIn.x + 86400000,
          y0: skillsIndex + 0.1,
        });

      return data;
    });
  };

  const makeSeries = (series, skillsIndex) => {
    const props = {
      key: skillsIndex,
      data: makeSeriesData(series, skillsIndex),
      onValueMouseOver,
      onValueMouseOut,
      onValueClick,
    };
    if (!gantt) Object.assign(props, { color: series.color });
    return gantt ? <VerticalRectSeries {...props} /> : <VerticalBarSeries {...props} />;
  };

  const makeChart = () => {
    let props = {
      xType: 'time',
      height: 800,
      margin: { top: 20, right: 20, bottom: 70 },
    };

    if (gantt) {
      props = {
        ...props,
        margin: { ...props.margin, left: 80 },
        colorRange: [CHART_COLORS.HIGHLIGHTED, CHART_COLORS.MIN, CHART_COLORS.MAX],
        colorDomain: [-99, seriesSet.min, seriesSet.max],
      };
    } else {
      props = { ...props, stackBy: 'y' };
    }

    return (
      <XYPlot width={width} {...props}>
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        {gantt ? (
          <YAxis
            tickFormat={(t, i) => skills[i]}
            tickValues={[...Array(skills.length).keys()].map((i) => i + 0.5)}
          />
        ) : (
          <YAxis tickFormat={(t) => (Math.round(t) === t ? t : '')} />
        )}
        {seriesSet.map((s, index) => makeSeries(s, index, gantt))}
      </XYPlot>
    );
  };

  const seriesHasData = () =>
    seriesSets[seriesKey].reduce((accumulator, series) => accumulator + series.data.length, 0) > 0;

  return (
    <>
      {seriesHasData() ? (
        <>
          {makeChart()}
          <div>{makeLegend()}</div>
        </>
      ) : (
        <div className={classes.fullWidthContent}>
          <Typography variant={variant.prompt}>
            No data to display. Please refine your date range.
          </Typography>
        </div>
      )}
    </>
  );
};
