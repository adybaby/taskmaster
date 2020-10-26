import React from 'react';
import {
  XYPlot,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalRectSeries,
  ContinuousColorLegend,
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import { Inspector } from './Inspector';
import { useStyles, CHART_COLORS } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { capitalize } from '../../util/String';

const ONE_DAY = 86400000;

export const ResourceGanttChart = ({
  selectedChart,
  selectedSkillInfo,
  chartData,
  width,
  setDownloadEnabled,
  ...propsForInspector
}) => {
  const classes = useStyles()();

  let maxTotal = 0;
  let minTotal = 99999;

  const makeSkillSeries = (skill, skillIndex) => {
    const skillSeries = [];
    chartData.forEach((currentDay) => {
      const total = currentDay[selectedChart.seriesKey].skillCounts[skill.id];
      if (total > 0) {
        const participants = currentDay[selectedChart.seriesKey].participants;
        const dateInMilis = currentDay.date;

        if (total < minTotal) {
          minTotal = total;
        }
        if (total > maxTotal) {
          maxTotal = total;
        }
        skillSeries.push({
          x: dateInMilis + ONE_DAY - 1,
          x0: dateInMilis,
          y: skillIndex + 0.9,
          y0: skillIndex + 0.1,
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
          color: total,
        });
      }
    });

    if (skillSeries.length === 0) return null;

    return <VerticalRectSeries key={skill.id} data={skillSeries} {...propsForInspector} />;
  };

  const ganttYTickValues = [...Array(selectedSkillInfo.length).keys()].map((i) => i + 0.5);

  return (
    <>
      <XYPlot
        width={width}
        xType="time"
        height={800}
        margin={{ top: 20, right: 20, bottom: 70, left: 80 }}
        colorRange={[CHART_COLORS.HIGHLIGHTED, CHART_COLORS.MIN, CHART_COLORS.MAX]}
        colorDomain={[-99, 0, 5]}
      >
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis
          tickFormat={(t, i) => capitalize(selectedSkillInfo[i].title)}
          tickValues={ganttYTickValues}
        />
        {selectedSkillInfo.map((skillInfo, skillIndex) => makeSkillSeries(skillInfo, skillIndex))}
      </XYPlot>
      <div className={classes.continuousChartLegend}>
        <ContinuousColorLegend
          startColor={CHART_COLORS.MIN}
          endColor={CHART_COLORS.MAX}
          startTitle={minTotal === 99999 ? 0 : minTotal}
          midTitle={Math.round(((minTotal === 99999 ? 0 : minTotal) + maxTotal) / 2)}
          endTitle={maxTotal}
        />
      </div>
    </>
  );
};
