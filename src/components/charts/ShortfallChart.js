import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ShortfallChart = (props) => (
  <ResourceBarChart
    seriesKey="shortfall"
    totalsTitle={{
      singular: 'is required',
      plural: 'are required',
      singularNegative: 'is available',
      pluralNegative: 'are available',
    }}
    positive={true}
    {...props}
  />
);
