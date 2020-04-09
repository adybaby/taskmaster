import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ExcessChart = (props) => (
  <ResourceBarChart
    title="Excess (remaining resources after sign ups)"
    seriesKey="shortfall"
    totalsTitle="Excess"
    gantt={false}
    positive={false}
    {...props}
  />
);
