import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const VacancyChart = (props) => (
  <ResourceBarChart seriesKey="vacancies" totalsTitle="Vacancies" {...props} />
);
