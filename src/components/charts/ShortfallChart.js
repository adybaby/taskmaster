import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ShortfallChart = (props) => (
  <ResourceBarChart seriesKey="shortfall" totalsTitle="Required" positive={true} {...props} />
);
