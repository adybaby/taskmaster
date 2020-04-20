import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const AvailabilityChart = (props) => (
  <ResourceBarChart
    seriesKey="availability"
    totalsTitle={{ singular: 'is required', plural: 'are required' }}
    {...props}
  />
);
