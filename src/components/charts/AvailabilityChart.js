import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const AvailabilityChart = (props) => (
  <ResourceBarChart seriesKey="availability" totalsTitle="Available" {...props} />
);
