export const CHART_TYPES = {
  BAR_GANTT: { id: 'bar_gantt', label: 'Resources (Gantt)', startOpen: true },
  BAR_STACKED: { id: 'bar_stacked', label: 'Resources (Stacked)', startOpen: true },
};

const chartDescriptions = [
  {
    id: 'vacancies',
    title: 'Vacancies',
    info: 'The number of open vacancies on the given dates.',
    seriesKey: 'vacancies',
  },
  {
    id: 'availability',
    title: 'Stated Availability',
    info: 'The number of users who have stated availability on the given dates.',
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
    info:
      'The number of users with the specified skill that are signed up to vacancies on a given date.',
    seriesKey: 'signedUp',
  },
  {
    id: 'shortfall',
    title: 'Shortfall',
    info:
      'Open vacancies on a given date minus the number of users which have said they are available.',
    seriesKey: 'shortfall',
  },
];

export const RESOURCE_CHART_DEFINITIONS = Object.values(CHART_TYPES).map(
  ({ id: typeId, ...typeProps }) => ({
    id: typeId,
    ...typeProps,
    charts: chartDescriptions.map(({ id, ...chartProps }) => ({
      id: `${id}_${typeId}`,
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
