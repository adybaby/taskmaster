import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const SignedUpChart = (props) => {
  return (
    <ResourceBarChart
      seriesKey="signedUp"
      totalsTitle={{ singular: 'is signed up', plural: 'are signed Up' }}
      {...props}
    />
  );
};
