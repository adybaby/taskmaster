import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const SignedUpChart = (props) => {
  return (
    <ResourceBarChart title="Sign Ups" seriesKey="signedUp" totalsTitle="Signed Up" {...props} />
  );
};
