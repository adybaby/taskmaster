import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const SignedUpChart = (props) => {
  return <ResourceBarChart seriesKey="signedUp" totalsTitle="Signed Up" {...props} />;
};
