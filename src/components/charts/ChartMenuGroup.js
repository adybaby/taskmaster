import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const ChartMenuGroup = ({
  title,
  charts,
  handleChartMenuItemClicked,
  startOpen,
  selectedChart,
}) => {
  const classes = useStyles();
  const [folderOpen, setFolderOpen] = useState(startOpen);

  const onFolderClick = () => {
    setFolderOpen(!folderOpen);
  };

  return (
    <>
      <ListItem button onClick={onFolderClick}>
        <ListItemText primary={<b>{title}</b>} />
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
              className={classes.chartListItem}
            >
              <ListItemText primary={chart.menuLabel} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
