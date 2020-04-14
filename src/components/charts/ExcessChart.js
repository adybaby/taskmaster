import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ExcessChart = (props) => (
  <ResourceBarChart
    seriesKey="shortfall"
    totalsTitle="Excess"
    gantt={false}
    positive={false}
    {...props}
  />
);
