import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { Collapse, ListItem, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useStyles } from '../../styles/Styles';
import { RESOURCE_CHART_DEFINITIONS as chartGroups } from '../../constants/Constants';
import { SideDrawer } from './SideDrawer';

const ChartMenuGroup = ({
  chartGroup: { label, startOpen, charts },
  handleChartMenuItemClicked,
  selectedChart,
}) => {
  const classes = useStyles()();
  const [folderOpen, setFolderOpen] = useState(startOpen);

  const onFolderClick = () => {
    setFolderOpen(!folderOpen);
  };

  return (
    <>
      <ListItem className={classes.chartMenuFolder} button onClick={onFolderClick}>
        <Typography className={classes.chartListItem}>
          <b>{label}</b>
        </Typography>
        {folderOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={folderOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {charts.map((chart, index) => (
            <ListItem
              button
              key={index}
              selected={chart === selectedChart}
              onClick={() => handleChartMenuItemClicked(chart)}
            >
              <Typography className={classes.chartListItem} noWrap={true}>
                {chart.title}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const ChartMenu = ({ open, selectedChart, onClose, onClick }) => {
  const classes = useStyles()();

  const chartMenuBody = () => (
    <List className={classes.chartMenuBody} component="nav" aria-label="charts list navigation">
      {chartGroups.map((chartGroup, index) => (
        <ChartMenuGroup
          key={index}
          chartGroup={chartGroup}
          handleChartMenuItemClicked={onClick}
          selectedChart={selectedChart}
        />
      ))}
    </List>
  );

  return (
    <>
      <div className={classes.chartMenuSideBar}>{chartMenuBody()}</div>
      <SideDrawer content={chartMenuBody()} anchor={'left'} open={open} onClose={onClose} />
    </>
  );
};
