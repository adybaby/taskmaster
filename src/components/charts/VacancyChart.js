import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const VacancyChart = (props) => (
  <ResourceBarChart title="Vacancies" seriesKey="vacancies" totalsTitle="Vacancies" {...props} />
);
