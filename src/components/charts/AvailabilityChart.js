import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const AvailabilityChart = (props) => (
  <ResourceBarChart
    title="Availability (before sign ups)"
    seriesKey="availability"
    totalsTitle="Available"
    {...props}
  />
);
