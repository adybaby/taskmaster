import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ActualAvailabilityChart = (props) => (
  <ResourceBarChart
    seriesKey="actualAvailability"
    totalsTitle={{
      singular: 'is available',
      plural: 'are available',
      singularNegative: 'is required',
      pluralNegative: 'are required',
    }}
    {...props}
  />
);
