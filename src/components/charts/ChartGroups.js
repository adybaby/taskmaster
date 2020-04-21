import { VacancyChart } from './VacancyChart';
import { SignedUpChart } from './SignedUpChart';
import { AvailabilityChart } from './AvailabilityChart';
import { ActualAvailabilityChart } from './ActualAvailabilityChart';
import { ExcessChart } from './ExcessChart';
import { ShortfallChart } from './ShortfallChart';

const vacanciesTitle = 'Vacancies';
const availabilityTitle = 'Stated Availability';
const actualAvailabilityTitle = 'Actual Availability';
const signedUpTitle = 'Signed Up';
const shortfallTitle = 'Shortfall';
const excessTitle = 'Excess';
const vacancyInfo = 'Initiatives which have open vacancies on the given dates.';
const availalabilityInfo =
  'The dates that users with particular skills have said they are available.';
const actualAvailabilityStackedInfo =
  'The dates that users with particular skills have said they are available minus the dates that those users have already signed up to initiatives.';
const actualAvailabilityGanttInfo = `${actualAvailabilityStackedInfo}  A negative number means that more users have signed up than are stated as available.`;
const shortFallGanttInfo =
  'Open vacancies on a given date minus the number of users which have said they are available.  A negative number indicates insufficient availability on that date.';
const signedUpInfo = 'The number of skills that are signed up to vacancies on a given date.';
const shortFallStackedInfo =
  'The numbers of skills required which are not currently available on a given date.';
const excessInfo = 'The numbers of skills available which are not currently required.';

export const chartGroups = [
  {
    groupTitle: 'Resources (Gantt)',
    startOpen: true,
    charts: [
      {
        id: 'VACANCIES_GANTT',
        menuLabel: vacanciesTitle,
        chartTitle: vacanciesTitle,
        chartInfo: vacancyInfo,
        chart: VacancyChart,
        gantt: true,
      },
      {
        id: 'STATED_AVAILABILITY_GANTT',
        menuLabel: availabilityTitle,
        chartTitle: availabilityTitle,
        chartInfo: availalabilityInfo,
        chart: AvailabilityChart,
        gantt: true,
      },
      {
        id: 'ACTUAL_AVAILABILITY_GANTT',
        menuLabel: actualAvailabilityTitle,
        chartTitle: actualAvailabilityTitle,
        chartInfo: actualAvailabilityGanttInfo,
        chart: ActualAvailabilityChart,
        gantt: true,
      },
      {
        id: 'SIGNED_UP_GANTT',
        menuLabel: signedUpTitle,
        chartTitle: signedUpTitle,
        chartInfo: signedUpInfo,
        chart: SignedUpChart,
        gantt: true,
      },
      {
        id: 'SHORTFALL_GANTT',
        menuLabel: shortfallTitle,
        chartTitle: shortfallTitle,
        chartInfo: shortFallGanttInfo,
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
        menuLabel: vacanciesTitle,
        chartTitle: vacanciesTitle,
        chartInfo: vacancyInfo,
        chart: VacancyChart,
      },
      {
        id: 'STATED_AVAILABILITY_STACKED',
        menuLabel: availabilityTitle,
        chartTitle: availabilityTitle,
        chartInfo: availalabilityInfo,
        chart: AvailabilityChart,
      },
      {
        id: 'ACTUAL_AVAILABILITY_STACKED',
        menuLabel: actualAvailabilityTitle,
        chartTitle: actualAvailabilityTitle,
        chartInfo: actualAvailabilityStackedInfo,
        chart: ActualAvailabilityChart,
      },
      {
        id: 'SIGNED_UP_STACKED',
        menuLabel: signedUpTitle,
        chartTitle: signedUpTitle,
        chartInfo: signedUpInfo,
        chart: SignedUpChart,
      },
      {
        id: 'SHORTFALL_STACKED',
        menuLabel: shortfallTitle,
        chartTitle: shortfallTitle,
        chartInfo: shortFallStackedInfo,
        chart: ShortfallChart,
      },
      {
        id: 'EXCESS_STACKED',
        menuLabel: excessTitle,
        chartTitle: excessTitle,
        chartInfo: excessInfo,
        chart: ExcessChart,
      },
    ],
  },
];
