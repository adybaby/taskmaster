import pluralize from 'pluralize';

export const CHART_TYPES = {
  BAR_GANTT: { id: 'bar_gantt', label: 'Resources (Gantt)', startOpen: true },
  BAR_STACKED: { id: 'bar_stacked', label: 'Resources (Stacked)', startOpen: true },
};

const chartDescriptions = [
  {
    id: 'vacancies',
    title: 'Vacancies',
    info: 'Initiatives which have open vacancies on the given dates.',
    seriesKey: 'vacancies',
    noun: 'vacancy',
  },
  {
    id: 'availability',
    title: 'Stated Availability',
    info: 'Initiatives which have open vacancies on the given dates.',
    seriesKey: 'availability',
  },
  {
    id: 'actual_availability',
    title: 'Actual Availability',
    info:
      'The dates that users with particular skills have said they are' +
      ' available minus the dates that those users have already signed up to initiatives.',
    seriesKey: 'actualAvailability',
  },
  {
    id: 'signed_up',
    title: 'Signed Up',
    info: 'The number of skills that are signed up to vacancies on a given date.',
    seriesKey: 'signedUp',
    adjective: 'signed up',
  },
  {
    id: 'shortfall',
    title: 'Shortfall',
    info:
      'Open vacancies on a given date minus the number of users which have said they are available',
    seriesKey: 'shortfall',
    adjective: 'needed',
  },
  {
    id: 'excess',
    title: 'Excess',
    info: 'The numbers of skills available which are not currently required.',
    seriesKey: 'excess',
  },
];

const daySummary = ({ noun, adjective }) => (count, skill, formattedDate) => {
  const absCount = Math.abs(count);
  const displaySkill = skill === skill.toUpperCase() ? skill : skill.toLowerCase();
  return `${absCount === 0 ? 'No' : absCount} ${
    typeof noun === 'undefined'
      ? `${pluralize(displaySkill, absCount)} ${absCount === 1 ? 'is' : 'are'} ${
          typeof adjective !== 'undefined' ? adjective : count >= 0 ? 'available' : 'needed'
        }`
      : `${displaySkill} ${pluralize(noun, absCount)}`
  } on the ${formattedDate}`;
};

export const RESOURCE_CHART_DEFINITIONS = Object.values(CHART_TYPES).map(
  ({ id: typeId, ...typeProps }) => ({
    id: typeId,
    ...typeProps,
    charts: chartDescriptions.map(({ id, noun, adjective, ...chartProps }) => ({
      id: `${id}_${typeId}`,
      daySummary: daySummary({
        noun,
        adjective,
      }),
      type: typeId,
      ...chartProps,
    })),
  })
);

export const getResourceChartDefinition = (chartId) => {
  return RESOURCE_CHART_DEFINITIONS.map((group) => group.charts)
    .flat()
    .find((ch) => ch.id === chartId);
};

export const DEFAULT_CHART = RESOURCE_CHART_DEFINITIONS[0].charts[0];
