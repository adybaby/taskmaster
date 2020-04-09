import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ActualAvailabilityChart = (props) => (
  <ResourceBarChart
    title="Availability (after sign ups)"
    seriesKey="actualAvailability"
    totalsTitle="Available"
    {...props}
  />
);
