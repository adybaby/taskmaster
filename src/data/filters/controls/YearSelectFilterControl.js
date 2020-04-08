const DEFAULT_FILTER_ID = 'ALL_TIME';
export const YEAR_SELECT_FILTER_ID = 'YEAR_SELECT_FILTER_ID';

const getDateRangeForYear = (year) => ({
  from: new Date(year, 0, 1),
  to: new Date(year + 1, 0, 1),
});

export const createYearSelectFilterControl = () => ({
  options: [
    { id: DEFAULT_FILTER_ID, label: 'All time', dontPreCount: true, default: true },
    {
      id: `LAST_YEAR`,
      label: 'Last year',
      dontPreCount: true,
      params: getDateRangeForYear(new Date().getFullYear() - 1),
    },
    {
      id: `THIS_YEAR`,
      label: 'This year',
      dontPreCount: true,
      params: getDateRangeForYear(new Date().getFullYear()),
    },
    {
      id: `NEXT_YEAR`,
      label: 'Next year',
      dontPreCount: true,
      params: getDateRangeForYear(new Date().getFullYear() + 1),
    },
    {
      id: `SPECIFIC_YEAR`,
      label: 'A specific year',
      datePicker: true,
      dontPreCount: true,
    },
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
