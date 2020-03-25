/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  FlexibleWidthXYPlot,
  VerticalRectSeries,
  VerticalBarSeries,
  ContinuousColorLegend,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint,
  DiscreteColorLegend
} from 'react-vis';
import { useSelector } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';
import styles from '../../styles/Styles';
import { MarkPanel } from './ResourceMarkPanel';

const useStyles = makeStyles(theme => styles(theme));

const BarChart = ({ title, seriesKey, totalsTitle, positive, gantt }) => {
  const classes = useStyles();
  const seriesSets = useSelector(calculateResourceChartData);
  const seriesSet = seriesSets[seriesKey];
  const skills = seriesSets.skillsAndColors.map(s => s.title);
  const { refs } = seriesSets;
  const [dataPoint, setDataPoint] = useState(null);
  const [inspectorPanel, setInspectorPanel] = useState(null);
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
    const getStackedY = y => {
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
        )
      };
      if (gantt)
        Object.assign(data, {
          color:
            dataPoint !== null && dataPoint.x === d.x && dataPoint.y === skillsIndex + 0.9
              ? -99
              : d.y,
          x0: d.x + 86400000,
          y0: skillsIndex + 0.1
        });

      return data;
    });
  };

  const makeSeries = (series, skillsIndex) => {
    const props = {
      key: skillsIndex,
      data: makeSeriesData(series, skillsIndex),
      onValueMouseOver: dp => {
        setDataPoint(dp);
      },
      onValueClick: dp => {
        setInspectorPanel(dp.markPanel);
      }
    };
    if (!gantt) Object.assign(props, { color: series.color });
    return gantt ? <VerticalRectSeries {...props} /> : <VerticalBarSeries {...props} />;
  };

  const makeChart = () => {
    const props = {
      xType: 'time',
      height: 800,
      onMouseLeave: () => setDataPoint(null)
    };

    if (gantt)
      Object.assign(props, {
        margin: { left: 100 },
        colorRange: [COLORS.HIGHLIGHTED, COLORS.MIN, COLORS.MAX],
        colorDomain: [-99, seriesSet.min, seriesSet.max]
      });
    else Object.assign(props, { stackBy: 'y' });

    return (
      <FlexibleWidthXYPlot {...props}>
        <HorizontalGridLines />
        <XAxis />
        {gantt ? (
          <YAxis
            tickFormat={(t, i) => skills[i]}
            tickValues={[...Array(skills.length).keys()].map(i => i + 0.5)}
          />
        ) : (
          <YAxis tickFormat={t => (Math.round(t) === t ? t : '')} />
        )}
        {seriesSet.map((s, index) => makeSeries(s, index, gantt))}
        {dataPoint !== null ? (
          <Hint align={{ vertical: 'top', horizontal: 'left' }} value={dataPoint}>
            <Paper>{dataPoint.markPanel}</Paper>
          </Hint>
        ) : null}
      </FlexibleWidthXYPlot>
    );
  };

  return (
    <div className={classes.contentWithSideBar_Container}>
      <div className={classes.contentWithSideBar_content}>
        <div>
          <h3>{title}</h3>
          {makeChart()}
        </div>
        {makeLegend()}
      </div>
      <div className={classes.contentWithSideBar_sideBarRight}>
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
      </div>
    </div>
  );
};

export const VacancyChart = ({ gantt }) => (
  <BarChart title="Vacancies" seriesKey="vacancies" totalsTitle="Vacancies" gantt={gantt} />
);

export const AvailabilityChart = ({ gantt }) => (
  <BarChart
    title="Availability (before sign ups)"
    seriesKey="availability"
    totalsTitle="Available"
    gantt={gantt}
  />
);

export const ActualAvailabilityChart = ({ gantt }) => (
  <BarChart
    title="Availability (after sign ups)"
    seriesKey="actualAvailability"
    totalsTitle="Available"
    gantt={gantt}
  />
);

export const SignedUpChart = ({ gantt }) => {
  return <BarChart title="Sign Ups" seriesKey="signedUp" totalsTitle="Signed Up" gantt={gantt} />;
};

export const ShortfallChart = ({ gantt }) => (
  <BarChart
    title="Required Resources (remaining vacancies after sign ups)"
    seriesKey="shortfall"
    totalsTitle="Required"
    gantt={gantt}
    positive={true}
  />
);
export const ExcessChart = () => (
  <BarChart
    title="Excess (remaining resources after sign ups)"
    seriesKey="shortfall"
    totalsTitle="Excess"
    gantt={false}
    positive={false}
  />
);
