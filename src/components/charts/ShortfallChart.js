import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const ShortfallChart = (props) => (
  <ResourceBarChart
    title="Required Resources (remaining vacancies after sign ups)"
    seriesKey="shortfall"
    totalsTitle="Required"
    positive={true}
    {...props}
  />
);
