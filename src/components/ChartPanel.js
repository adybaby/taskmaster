/* eslint-disable no-restricted-syntax */
import React from 'react';
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import { useSelector } from 'react-redux';
import { getResourceNeedsData } from '../charts/ChartData';
import '../../node_modules/react-vis/dist/style.css';
import { getNeededSkills } from '../util/Vacancies';

const ChartPanel = () => {
  const tasks = useSelector(state => state.tasks);
  const users = useSelector(state => state.users);
  const chartData = getResourceNeedsData(users, tasks, getNeededSkills(tasks));

  const getSeries = () => {
    const series = [];
    chartData.forEach((cd, index) => {
      series.push(<VerticalBarSeries key={index} data={cd.data} />);
    });
    return series;
  };

  return (
    <div>
      <br />
      <br />
      <b>WIP - THIS IS NOT YET WORKING</b>
      <br />
      <br />
      <XYPlot xType="ordinal" stackBy="y" height={800} width={800}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />

        {getSeries()}
      </XYPlot>
    </div>
  );
};

export default ChartPanel;
