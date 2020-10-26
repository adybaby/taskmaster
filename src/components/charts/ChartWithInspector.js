import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Hidden } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { SideDrawer } from './SideDrawer';

export const ChartWithInspector = (props) => {
  const classes = useStyles()();
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  const [dataPoint, setDataPoint] = useState(null);
  const [inspectorPanel, setInspectorPanel] = useState(null);
  const [inspectorDrawerVisible, setInspectorDrawerVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);

  const updateWindowDimensions = () => {
    setWinHeight(window.innerHeight);
    setWinWidth(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener('resize', updateWindowDimensions);
    },
    []
  );

  const onValueClick = (clickedDataPoint) => {
    setInspectorPanel(clickedDataPoint.inspector);
    setInspectorDrawerVisible(true);
  };

  const onValueMouseOver = (hoveredDataPoint, { event }) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    setDataPoint(hoveredDataPoint);
  };

  const onValueMouseOut = () => {
    setDataPoint(null);
  };

  const inspectorPopUp = () => {
    if (dataPoint === null || mousePosition === null) return null;

    const horizontalPos =
      mousePosition.x < winWidth / 2
        ? { left: mousePosition.x + 30 }
        : { right: winWidth - mousePosition.x + 10 };
    const verticalPos =
      mousePosition.y < winHeight / 2
        ? { top: mousePosition.y + 30 }
        : { bottom: winHeight - mousePosition.y + 10 };

    return (
      <>
        <div
          className={classes.inspectorToolTip}
          style={{
            ...horizontalPos,
            ...verticalPos,
          }}
        >
          <Paper>{dataPoint.inspector}</Paper>
        </div>
      </>
    );
  };

  return (
    <>
      {props.children({ onValueMouseOver, onValueClick, onValueMouseOut, dataPoint })}
      <Hidden xsDown>{inspectorPopUp()}</Hidden>
      <SideDrawer
        content={inspectorPanel}
        anchor="right"
        open={inspectorDrawerVisible}
        onClose={() => setInspectorDrawerVisible(false)}
        onClick={() => setInspectorDrawerVisible(false)}
      />
    </>
  );
};
