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
import { MarkPanel } from './ResourceMarkPanel';

export const ResourceBarChart = ({
  title,
  seriesSets,
  seriesKey,
  totalsTitle,
  positive,
  gantt,
  onValueMouseOver,
  onValueClick,
  onMouseLeave,
  hint,
  width,
  dataPoint,
}) => {
  const seriesSet = seriesSets[seriesKey];
  const skills = seriesSets.skillsAndColors.map((s) => s.title);
  const { refs } = seriesSets;
  const COLORS = { MIN: '#FFFFFF', MAX: '#33ACFF', HIGHLIGHTED: '#FFA500' };

  const makeLegend = () =>
    gantt ? (
      <div style={{ paddingLeft: '100px', paddingTop: '20px' }}>
        {' '}
        <ContinuousColorLegend
          startColor={COLORS.MIN}
          endColor={COLORS.MAX}
          width={400}
          startTitle={seriesSet.min}
          midTitle={Math.floor(seriesSet.max / 2)}
          endTitle={seriesSet.max}
        />
      </div>
    ) : (
      <DiscreteColorLegend orientation="horizontal" items={seriesSets.skillsAndColors} />
    );

  const makeSeriesData = (series, skillsIndex) => {
    const getStackedY = (y) => {
      if (typeof positive === 'undefined') {
        return y;
      }
      if (positive) {
        return y < 0 ? 0 : y;
      }
      return y > 0 ? 0 : Math.abs(y);
    };

    return series.data.map((d, dataIndex) => {
      const y = gantt ? skillsIndex + 0.9 : getStackedY(d.y);
      const data = {
        x: d.x,
        y,
        markPanel: (
          <MarkPanel
            dayRefData={refs[skillsIndex].data[dataIndex]}
            skillTitle={series.label}
            total={d.y}
            totalsTitle={totalsTitle}
          />
        ),
      };
      if (gantt)
        Object.assign(data, {
          color:
            dataPoint !== null && dataPoint.x === d.x && dataPoint.y === skillsIndex + 0.9
              ? -99
              : d.y,
          x0: d.x + 86400000,
          y0: skillsIndex + 0.1,
        });

      return data;
    });
  };

  const makeSeries = (series, skillsIndex) => {
    const props = {
      key: skillsIndex,
      data: makeSeriesData(series, skillsIndex),
      onValueMouseOver: (dp) => onValueMouseOver(dp),
      onValueClick: (dp) => onValueClick(dp),
    };
    if (!gantt) Object.assign(props, { color: series.color });
    return gantt ? <VerticalRectSeries {...props} /> : <VerticalBarSeries {...props} />;
  };

  const makeChart = () => {
    let props = {
      xType: 'time',
      height: 800,
      onMouseLeave: (dp) => onMouseLeave(dp),
      margin: { bottom: 100 },
    };

    if (gantt) {
      props = {
        ...props,
        margin: { ...props.margin, left: 100 },
        colorRange: [COLORS.HIGHLIGHTED, COLORS.MIN, COLORS.MAX],
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
        {hint}
      </XYPlot>
    );
  };

  return (
    <>
      <h3>{title}</h3>
      {seriesSets.refs[0].data.length > 0
        ? makeChart()
        : 'No data to display.  Please refine your date range.'}
      <div>{seriesSets.refs[0].data.length > 0 ? makeLegend() : null}</div>
    </>
  );
};
