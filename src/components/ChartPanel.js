/* eslint-disable no-restricted-syntax */

/* THIS IS SOOOOOOO VERY HACKY AND INEFFICIENT */

import React, { useEffect, useState } from 'react';
import {
  FlexibleWidthXYPlot,
  VerticalBarSeries,
  HorizontalGridLines,
  DiscreteColorLegend,
  XAxis,
  YAxis
} from 'react-vis';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  buildChartData,
  getTotalShortfall,
  getTotalVacancies,
  getTotalAvailability,
  getSignedUp,
  getActualAvailability
} from '../charts/ChartData';
import '../../node_modules/react-vis/dist/style.css';
import { getNeededSkills } from '../util/Vacancies';
import styles from '../styles/Styles';

const KELLY = [
  '#F2F3F4',
  '#222222',
  '#F3C300',
  '#875692',
  '#F38400',
  '#A1CAF1',
  '#BE0032',
  '#C2B280',
  '#848482',
  '#008856',
  '#E68FAC',
  '#0067A5',
  '#F99379',
  '#604E97',
  '#F6A600',
  '#B3446C',
  '#DCD300',
  '#882D17',
  '#8DB600',
  '#654522',
  '#E25822',
  '#2B3D26'
];

const useStyles = makeStyles(theme => styles(theme));

const ChartPanel = () => {
  const classes = useStyles();
  const tasks = useSelector(state => state.tasks);
  const users = useSelector(state => state.users);
  const [neededSkills, setNeededSkills] = useState(null);
  const [shortFallData, setShortFallData] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [actualAvailabilityData, setActualAvailabilityData] = useState(null);
  const [signedUpData, setSignedUpData] = useState(null);
  const [vacancyData, setVacancyData] = useState(null);
  const [retrievedData, setRetrievedData] = useState(false);
  const [builtChartData, setBuiltChartData] = useState(false);

  const addColors = data =>
    data.map((series, index) => ({
      label: series.label,
      data: series.data,
      color: KELLY[index]
    }));

  useEffect(() => {
    if (!builtChartData && typeof tasks !== 'undefined') {
      setNeededSkills(getNeededSkills(tasks));
    }
  }, [tasks, builtChartData]);

  useEffect(() => {
    if (!builtChartData && neededSkills !== null && typeof users !== 'undefined') {
      buildChartData(users, tasks, neededSkills);
      setRetrievedData(true);
    }
  }, [tasks, users, neededSkills, builtChartData]);

  useEffect(() => {
    if (!builtChartData && retrievedData) {
      setShortFallData(addColors(getTotalShortfall()));
      setAvailabilityData(addColors(getTotalAvailability()));
      setVacancyData(addColors(getTotalVacancies()));
      setActualAvailabilityData(addColors(getActualAvailability()));
      setSignedUpData(addColors(getSignedUp()));
      setBuiltChartData(true);
    }
  }, [retrievedData, builtChartData]);

  const makeVerticalBars = (data, positive) =>
    data.map((cd, index) => {
      let seriesData = null;
      if (typeof positive === 'undefined') {
        seriesData = cd.data;
      } else if (positive) {
        seriesData = cd.data.map(d => ({ x: d.x, y: d.y < 0 ? 0 : d.y }));
      } else {
        seriesData = cd.data.map(d => ({ x: d.x, y: d.y > 0 ? 0 : Math.abs(d.y) }));
      }
      return <VerticalBarSeries key={index} data={seriesData} color={cd.color} />;
    });

  const BarChart = ({ title, data, positive }) => (
    <>
      <div>
        <h3>{title}</h3>
        <FlexibleWidthXYPlot xType="time" stackBy="y" height={800}>
          <HorizontalGridLines />
          <XAxis title="Date" />
          <YAxis title="Number of Resources" />
          {makeVerticalBars(data, positive)}
        </FlexibleWidthXYPlot>
        <div>
          <DiscreteColorLegend
            orientation="horizontal"
            items={neededSkills.map((skill, index) => ({
              title: skill,
              color: KELLY[index],
              strokeWidth: 15
            }))}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {builtChartData ? (
        <div className={classes.outerPanel}>
          <BarChart title="Vacancies" data={vacancyData} />
          <BarChart title="Availability (before sign ups)" data={availabilityData} />
          <BarChart title="Availability (after sign ups)" data={actualAvailabilityData} />
          <BarChart title="Sign Ups" data={signedUpData} />
          <BarChart
            title="Required Resources (remaining vacancies after sign ups)"
            data={shortFallData}
            positive={true}
          />
          <BarChart
            title="Excess (remaining resources after sign ups)"
            data={shortFallData}
            positive={false}
          />
        </div>
      ) : (
        <div className={classes.outerPanel}>
          <h3>Building Charts..</h3>
        </div>
      )}
    </>
  );
};

export default ChartPanel;
