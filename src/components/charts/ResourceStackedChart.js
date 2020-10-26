import React from 'react';
import {
  XYPlot,
  VerticalBarSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend,
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import { Inspector } from './Inspector';
import { useStyles } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { capitalize } from '../../util/String';

const ONE_DAY = 86400000;

export const ResourceStackedChart = ({
  selectedChart,
  selectedSkillInfo,
  chartData,
  width,
  ...propsForInspector
}) => {
  const classes = useStyles()();

  const makeSkillSeries = (skill) => {
    let skillSeries = [];

    chartData.forEach((currentDay) => {
      const total = currentDay[selectedChart.seriesKey].skillCounts[skill.id];
      if (total > 0) {
        const participants = currentDay[selectedChart.seriesKey].participants;
        const dateInMilis = currentDay.date;
        skillSeries.push({
          x: dateInMilis + ONE_DAY - 1,
          y: total,
          inspector: (
            <Inspector
              total={total}
              skillId={skill.id}
              skillStr={capitalize(skill.title)}
              dateStr={formatDate(new Date(dateInMilis))}
              chartTitle={selectedChart.title}
              participants={participants}
            />
          ),
        });
      }
    });

    if (skillSeries.length === 0) return null;

    if (skillSeries.length === 1) {
      // this to deal with a react-viz "feature" where time axis require >1 x entries
      skillSeries = [
        { x: skillSeries[0].x - ONE_DAY, y: 0 },
        skillSeries[0],
        { x: skillSeries[0].x + ONE_DAY, y: 0 },
      ];
    }

    return (
      <VerticalBarSeries
        color={skill.color}
        key={skill.id}
        data={skillSeries}
        {...propsForInspector}
      />
    );
  };

  return (
    <>
      <XYPlot
        width={width}
        xType="time"
        height={800}
        margin={{ top: 20, right: 20, bottom: 70 }}
        stackBy="y"
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis tickFormat={(t) => (Math.round(t) === t ? t : '')} />
        {selectedSkillInfo.map((skillInfo) => makeSkillSeries(skillInfo))}
      </XYPlot>
      <DiscreteColorLegend
        className={classes.discreteChartLegend}
        orientation="horizontal"
        items={selectedSkillInfo}
      />
    </>
  );
};
