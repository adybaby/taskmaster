import React from 'react';
import {
  FlexibleWidthXYPlot,
  VerticalBarSeries,
  HorizontalGridLines,
  DiscreteColorLegend,
  XAxis,
  YAxis
} from 'react-vis';
import { useSelector } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';

const BarChart = ({ title, seriesSet, positive }) => (
  <>
    <h3>{title}</h3>
    <div>
      <FlexibleWidthXYPlot xType="time" stackBy="y" height={800}>
        <HorizontalGridLines />
        <XAxis title="Date" />
        <YAxis title="Number of Resources" />
        {seriesSet.map((series, index) => {
          let seriesData = null;
          if (typeof positive === 'undefined') {
            seriesData = series.data;
          } else if (positive) {
            seriesData = series.data.map(d => ({ x: d.x, y: d.y < 0 ? 0 : d.y }));
          } else {
            seriesData = series.data.map(d => ({ x: d.x, y: d.y > 0 ? 0 : Math.abs(d.y) }));
          }
          return <VerticalBarSeries key={index} data={seriesData} color={series.color} />;
        })}
      </FlexibleWidthXYPlot>
    </div>
    <div>
      <DiscreteColorLegend
        orientation="horizontal"
        items={useSelector(calculateResourceChartData).skillsAndColors}
      />
    </div>
  </>
);

export const VacancyChart = () => (
  <BarChart title="Vacancies" seriesSet={useSelector(calculateResourceChartData).vacancies} />
);

export const AvailabilityChart = () => (
  <BarChart
    title="Availability (before sign ups)"
    seriesSet={useSelector(calculateResourceChartData).availability}
  />
);

export const ActualAvailabilityChart = () => (
  <BarChart
    title="Availability (after sign ups)"
    seriesSet={useSelector(calculateResourceChartData).actualAvailability}
  />
);

export const SignedUpChart = () => {
  return <BarChart title="Sign Ups" seriesSet={useSelector(calculateResourceChartData).signedUp} />;
};

export const ShortfallChart = () => (
  <BarChart
    title="Required Resources (remaining vacancies after sign ups)"
    seriesSet={useSelector(calculateResourceChartData).shortfall}
    positive={true}
  />
);

export const ExcessChart = () => (
  <BarChart
    title="Excess (remaining resources after sign ups)"
    seriesSet={useSelector(calculateResourceChartData).shortfall}
    positive={false}
  />
);
