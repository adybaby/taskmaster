import React from 'react';
import { VerticalBarSeries, XYPlot } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

export const TestChart = () => {
  const data = [
    { x: 1, y: 2, color: 1 },
    { x: 2, y: 3, color: 2 },
    { x: 3, y: 4, color: 3 },
    { x: 4, y: 5, color: 4 },
    { x: 5, y: 6, color: 5 },
    { x: 6, y: 7, color: 6 },
    { x: 7, y: 8, color: 7 },
    { x: 8, y: 9, color: 8 },
    { x: 9, y: 10, color: 9 }
  ];

  return (
    <div>
      <XYPlot colorRange={['#00FF00', '#FF0000']} width={800} height={800}>
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
  );
};
