/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  FlexibleWidthXYPlot,
  VerticalRectSeries,
  ContinuousColorLegend,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import { useSelector } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';

const BarChart = ({ title, seriesSet, positive }) => {
  const skills = useSelector(calculateResourceChartData).skillsAndColors.map(s => s.title);
  const tickValues = [];
  for (let i = 0; i < skills.length; i++) {
    tickValues.push(i + 0.5);
  }

  const tickFormat = (t, i) => {
    return skills[i];
  };
  return (
    <>
      <h3>{title}</h3>
      <div>
        <FlexibleWidthXYPlot
          margin={{ left: 100 }}
          colorRange={['#FFFFFF', '#33ACFF']}
          xType="time"
          height={800}
        >
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickFormat={tickFormat} tickValues={tickValues} />
          {seriesSet.map((series, index) => {
            return (
              <VerticalRectSeries
                key={index}
                data={series.data.map(d => ({
                  x: d.x,
                  x0: d.x + 86400000,
                  y: index + 0.9,
                  y0: index + 0.1,
                  color: positive ? (d.y < 0 ? 0 : d.y) : d.y > 0 ? 0 : Math.abs(d.y)
                }))}
              />
            );
          })}
        </FlexibleWidthXYPlot>
        <div style={{ paddingLeft: '100px', paddingTop: '20px' }}>
          <ContinuousColorLegend
            startColor={'#FFFFFF'}
            endColor={'#33ACFF'}
            width={400}
            startTitle={0}
            midTitle={Math.round(seriesSet.max / 2)}
            endTitle={seriesSet.max}
          />
        </div>
      </div>
    </>
  );
};

export const VacancyChart = () => (
  <BarChart
    title="Vacancies"
    positive={true}
    seriesSet={useSelector(calculateResourceChartData).vacancies}
  />
);

export const AvailabilityChart = () => (
  <BarChart
    title="Availability (before sign ups)"
    positive={true}
    seriesSet={useSelector(calculateResourceChartData).availability}
  />
);

export const ActualAvailabilityChart = () => (
  <BarChart
    title="Availability (after sign ups)"
    positive={true}
    seriesSet={useSelector(calculateResourceChartData).actualAvailability}
  />
);

export const SignedUpChart = () => {
  return (
    <BarChart
      title="Sign Ups"
      positive={true}
      seriesSet={useSelector(calculateResourceChartData).signedUp}
    />
  );
};

export const ShortfallChart = () => (
  <BarChart
    title="Required Resources (remaining vacancies after sign ups)"
    positive={true}
    seriesSet={useSelector(calculateResourceChartData).shortfall}
  />
);

export const ExcessChart = () => (
  <BarChart
    title="Excess (remaining resources after sign ups)"
    positive={false}
    seriesSet={useSelector(calculateResourceChartData).shortfall}
  />
);
