import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ActualAvailabilityChart = (props) => (
  <ResourceBarChart seriesKey="actualAvailability" totalsTitle="Available" {...props} />
);
