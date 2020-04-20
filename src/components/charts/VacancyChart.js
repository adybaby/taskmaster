import React from 'react';
import { ResourceBarChart } from './ResourceBarChart';

export const VacancyChart = (props) => (
  <ResourceBarChart
    seriesKey="vacancies"
    totalsTitle={{ singular: 'Vacancy', plural: 'Vacancies' }}
    {...props}
  />
);
