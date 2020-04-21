import { VacancyChart } from './VacancyChart';
import { SignedUpChart } from './SignedUpChart';
import { AvailabilityChart } from './AvailabilityChart';
import { ActualAvailabilityChart } from './ActualAvailabilityChart';
import { ExcessChart } from './ExcessChart';
import { ShortfallChart } from './ShortfallChart';

export const chartGroups = [
  {
    groupTitle: 'Resources (Gantt)',
    startOpen: true,
    charts: [
      {
        id: 'VACANCIES_GANTT',
        menuLabel: 'Vacancies',
        chartTitle: 'Vacancies',
        chart: VacancyChart,
        gantt: true,
      },
      {
        id: 'STATED_AVAILABILITY_GANTT',
        menuLabel: 'Stated Availability',
        chartTitle: 'Stated Availability',
        chart: AvailabilityChart,
        gantt: true,
      },
      {
        id: 'ACTUAL_AVAILABILITY_GANTT',
        menuLabel: 'Actual Availability',
        chartTitle: 'Actual Availability (-ve is shortfall)',
        chart: ActualAvailabilityChart,
        gantt: true,
      },
      {
        id: 'SIGNED_UP_GANTT',
        menuLabel: 'Signed Up',
        chartTitle: 'Signed Up',
        chart: SignedUpChart,
        gantt: true,
      },
      {
        id: 'SHORTFALL_GANTT',
        menuLabel: 'Shortfall',
        chartTitle: 'Shortfall (-ve is excess)',
        chart: ShortfallChart,
        gantt: true,
      },
    ],
  },
  {
    groupTitle: 'Resources (Stacked)',
    startOpen: true,
    charts: [
      {
        id: 'VACANCIES_STACKED',
        menuLabel: 'Vacancies',
        chartTitle: 'Vacancies',
        chart: VacancyChart,
      },
      {
        id: 'STATED_AVAILABILITY_STACKED',
        menuLabel: 'Stated Availability',
        chartTitle: 'Stated Availability',
        chart: AvailabilityChart,
      },
      {
        id: 'ACTUAL_AVAILABILITY_STACKED',
        menuLabel: 'Actual Availability',
        chartTitle: 'Actual Availability (-ve is shortfall)',
        chart: ActualAvailabilityChart,
      },
      {
        id: 'SIGNED_UP_STACKED',
        menuLabel: 'Signed Up',
        chartTitle: 'Signed Up',
        chart: SignedUpChart,
      },
      {
        id: 'SHORTFALL_STACKED',
        menuLabel: 'Shortfall',
        chartTitle: 'Shortfall (-ve is excess)',
        chart: ShortfallChart,
      },
      {
        id: 'EXCESS_STACKED',
        menuLabel: 'Excess',
        chartTitle: 'Excess',
        chart: ExcessChart,
      },
    ],
  },
];
