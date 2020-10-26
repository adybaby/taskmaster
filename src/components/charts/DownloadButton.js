import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import FileSaver from 'file-saver';
import { useStyles } from '../../styles/Styles';
import { formatDate } from '../../util/Dates';
import { ICONS } from '../../constants/Constants';
import { capitalize } from '../../util/String';

export const DownloadButton = ({ selectedChart, selectedSkillInfo, chartData, disabled }) => {
  const classes = useStyles()();

  const handleDownloadClicked = () =>
    FileSaver.saveAs(
      new Blob(
        [
          [
            ['Skill Group', ...selectedSkillInfo.map((skill) => capitalize(skill.title))].join(','),
            ...chartData
              .filter((day) => day[selectedChart.seriesKey].total > 0)
              .map((day) =>
                [
                  formatDate(new Date(day.date)),
                  ...selectedSkillInfo.map((selectedSkill) => {
                    const count = day[selectedChart.seriesKey].skillCounts[selectedSkill.id];
                    return count < 0 ? 0 : count;
                  }),
                ].join(',')
              ),
          ].join('\n'),
        ],
        { type: 'text/plain;charset=utf-8' }
      ),
      `taskmaster_${selectedChart.seriesKey}.csv`
    );

  return (
    <Tooltip title="DOWNLOAD CSV">
      <span className={classes.chartDownloadButton}>
        <Button
          disabled={disabled}
          className={classes.chartDownloadButton}
          onClick={handleDownloadClicked}
        >
          {ICONS.DOWNLOAD}
          <span className={classes.hidingLabel}>
            <b>DOWNLOAD</b>
          </span>
        </Button>
      </span>
    </Tooltip>
  );
};
