/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  FlexibleWidthXYPlot,
  VerticalRectSeries,
  ContinuousColorLegend,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint
} from 'react-vis';
import { useSelector } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { calculateResourceChartData } from '../../redux/selectors/ResourceChartDataSelector';
import { formatDate } from '../../util/DateFormatting';
import styles from '../../styles/Styles';
import { VacancyDates } from '../fragments/Vacancies';

const useStyles = makeStyles(theme => styles(theme));

const BarChart = ({ title, seriesSet, totalsTitle, showVacancies, showSignUps }) => {
  const classes = useStyles();
  const skills = useSelector(calculateResourceChartData).skillsAndColors.map(s => s.title);
  const tickValues = [];
  const [xTarget, setXTarget] = useState(null);
  const [yTarget, setYTarget] = useState(null);
  const [hintValue, setHintValue] = useState(false);

  for (let i = 0; i < skills.length; i++) {
    tickValues.push(i + 0.5);
  }

  const tickFormat = (t, i) => {
    return skills[i];
  };

  const makeVacanciesBlock = vacancies => (
    <Typography variant="body2">
      <b>Initiatives</b>
      <br />

      {vacancies.map((v, index) => (
        <React.Fragment key={index}>
          {v.count} required for <RouterLink to={`/task/${v.task.id}`}>{v.task.title}</RouterLink>
          {Array.isArray(v.vacancy.date) ? (
            <>
              {` `}
              <VacancyDates dates={v.vacancy.date} noUser={true} />
            </>
          ) : null}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  );

  const makeSignUpsBlock = signUps => (
    <Typography variant="body2">
      <b>{signUps[0].signUp === null ? 'Availability' : 'Sign-Ups'}</b>
      <br />

      {signUps.map((su, index) => (
        <React.Fragment key={index}>
          <RouterLink to={`/profile/${su.user.id}`}>{su.user.name}</RouterLink>
          {' - '}
          {su.signUp === null ? (
            Array.isArray(su.user.available) ? (
              <>
                {` `}
                <VacancyDates dates={su.user.available} noUser={true} />
              </>
            ) : null
          ) : (
            <>
              <RouterLink to={`/task/${su.signUp.id}`}>{su.signUp.title}</RouterLink>
              {Array.isArray(su.signUp.periods) ? (
                <>
                  {` `}
                  <VacancyDates dates={su.signUp.periods} noUser={true} />
                </>
              ) : null}
            </>
          )}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  );

  const makeHint = data => (
    <Paper>
      <Typography variant="subtitle1" className={classes.chartTooltip}>
        {formatDate(new Date(data.x))} ({data.y} {totalsTitle})
      </Typography>
      {showVacancies && data.vacancies.length > 0 ? (
        <>
          <Divider />
          <div className={classes.chartTooltip}>{makeVacanciesBlock(data.vacancies)}</div>
        </>
      ) : null}
      {showSignUps && data.signUps.length > 0 ? (
        <>
          <Divider />
          <div className={classes.chartTooltip}>{makeSignUpsBlock(data.signUps)}</div>
        </>
      ) : null}
    </Paper>
  );

  const makeLegend = () => (
    <ContinuousColorLegend
      startColor={'#FFFFFF'}
      endColor={'#33ACFF'}
      width={400}
      startTitle={seriesSet.min}
      midTitle={Math.floor(seriesSet.max / 2)}
      endTitle={seriesSet.max}
    />
  );

  const makeSeries = (series, index) => (
    <VerticalRectSeries
      key={index}
      data={series.data.map(d => ({
        x: d.x,
        x0: d.x + 86400000,
        y: index + 0.9,
        y0: index + 0.1,
        color: xTarget === d.x && yTarget === index + 0.9 ? -99 : d.y,
        hint: makeHint(d)
      }))}
      onValueMouseOver={datapoint => {
        setHintValue(datapoint);
        setXTarget(datapoint.x);
        setYTarget(datapoint.y);
      }}
    />
  );

  return (
    <>
      <h3>{title}</h3>
      <div>
        <FlexibleWidthXYPlot
          margin={{ left: 100 }}
          colorRange={['#FFA500', '#FFFFFF', '#33ACFF']}
          colorDomain={[-99, seriesSet.min, seriesSet.max]}
          xType="time"
          height={800}
          onMouseLeave={() => {
            setXTarget(null);
            setYTarget(null);
            setHintValue(false);
          }}
        >
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickFormat={tickFormat} tickValues={tickValues} />
          {seriesSet.map((series, index) => makeSeries(series, index))}

          {hintValue ? (
            <Hint align={{ vertical: 'top', horizontal: 'left' }} value={hintValue}>
              {hintValue.hint}
            </Hint>
          ) : null}
        </FlexibleWidthXYPlot>
        <div style={{ paddingLeft: '100px', paddingTop: '20px' }}>{makeLegend()}</div>
      </div>
    </>
  );
};

export const VacancyChart = () => (
  <BarChart
    title="Vacancies"
    seriesSet={useSelector(calculateResourceChartData).vacancies}
    totalsTitle="Vacancies"
    showVacancies={true}
  />
);

export const AvailabilityChart = () => (
  <BarChart
    title="Availability (before sign ups)"
    seriesSet={useSelector(calculateResourceChartData).availability}
    totalsTitle="Available"
    showSignUps={true}
  />
);

export const ActualAvailabilityChart = () => (
  <BarChart
    title="Availability (after sign ups)"
    seriesSet={useSelector(calculateResourceChartData).actualAvailability}
    totalsTitle="Available"
    showVacancies={true}
    showSignUps={true}
  />
);

export const SignedUpChart = () => {
  return (
    <BarChart
      title="Sign Ups"
      seriesSet={useSelector(calculateResourceChartData).signedUp}
      totalsTitle="Signed Up"
      showSignUps={true}
    />
  );
};

export const ShortfallChart = () => (
  <BarChart
    title="Required Resources (remaining vacancies after sign ups)"
    seriesSet={useSelector(calculateResourceChartData).shortfall}
    totalsTitle="Required"
    showVacancies={true}
    showSignUps={true}
  />
);
