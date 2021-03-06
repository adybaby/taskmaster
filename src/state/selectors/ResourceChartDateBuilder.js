import { KELLY } from '../../styles/Styles';

/* eslint-disable no-param-reassign */
let vacancies = null;
let interest = null;
let users = null;
let dateRange = null;
let skills = null;
let skillIds = null;

const seriesSets = {
  availability: null,
  signedUp: null,
  actualAvailability: null,
  vacancies: null,
  shortfall: null,
  excess: null,
  inspectorData: null,
  skillsAndColors: null,
};

const timeSeriesTemplate = (isInspector) => {
  const xy = [];
  for (
    let i = new Date(dateRange.first.getTime());
    i.getTime() <= dateRange.last.getTime();
    i.setDate(i.getDate() + 1)
  ) {
    if (isInspector) {
      xy.push({ x: i.getTime(), signedUp: [], vacancies: [], availability: [] });
    } else {
      xy.push({ x: i.getTime(), y: 0 });
    }
  }
  return xy;
};

const getSkillsAndColors = () =>
  skills.map((skill, index) => ({ title: skill.label, color: KELLY[index], strokeWidth: 15 }));

const seriesTemplate = () => ({
  series: skills.map((skill, index) => ({
    id: skill.id,
    label: skill.label,
    color: KELLY[index],
    data: timeSeriesTemplate(),
  })),
  min: 0,
  max: 0,
});

const inspectorDataTemplate = () => ({
  series: skills.map((skill) => ({
    id: skill.id,
    label: skill.label,
    data: timeSeriesTemplate(true),
  })),
});

const createSeriesTemplates = () => {
  seriesSets.skillsAndColors = getSkillsAndColors();
  seriesSets.availability = seriesTemplate();
  seriesSets.signedUp = seriesTemplate();
  seriesSets.actualAvailability = seriesTemplate();
  seriesSets.vacancies = seriesTemplate();
  seriesSets.shortfall = seriesTemplate();
  seriesSets.excess = seriesTemplate();
  seriesSets.inspectorData = inspectorDataTemplate();
};

const addResourceInfoForDateRange = (
  dateRangeSource,
  skillId,
  seriesSetKey,
  inspectorDataEntry
) => {
  const { data } = seriesSets[seriesSetKey].series.find((series) => series.id === skillId);
  const startIndex = data.findIndex((d) => d.x === dateRangeSource.startDate.getTime());
  const endIndex = data.findIndex((d) => d.x === dateRangeSource.endDate.getTime());
  const inspectorSeriesData = seriesSets.inspectorData.series.find(
    (series) => series.id === skillId
  ).data;

  for (let i = startIndex; i <= endIndex; i++) {
    data[i].y++;
    inspectorSeriesData[i][seriesSetKey].push(inspectorDataEntry);
  }
};

const addAvailabilityInfo = () => {
  users.forEach((user) => {
    user.skills
      .filter((userSkill) => skillIds.includes(userSkill.id))
      .forEach((userSkill) => {
        user.available.forEach((available) => {
          addResourceInfoForDateRange(available, userSkill.id, 'availability', {
            userId: user.id,
            userName: user.formattedName,
            skillId: userSkill.id,
            startDate: available.startDate,
            endDate: available.endDate,
          });
        });
      });
  });
};

const addVacanciesAndInterestInfo = () => {
  vacancies
    .filter((vacancy) => skillIds.includes(vacancy.skillId) && vacancy.status === 'Open')
    .forEach((vacancy) => {
      // add vacancy
      addResourceInfoForDateRange(vacancy, vacancy.skillId, 'vacancies', {
        taskId: vacancy.taskId,
        taskTitle: vacancy.taskTitle,
        skillId: vacancy.skillId,
        startDate: vacancy.startDate,
        endDate: vacancy.endDate,
      });

      interest
        .filter(
          (userInterest) =>
            userInterest.vacancyId === vacancy.id && userInterest.status === 'ACCEPTED'
        )
        .forEach((userInterest) => {
          // add sign up
          addResourceInfoForDateRange(userInterest, vacancy.skillId, 'signedUp', {
            taskId: vacancy.taskId,
            taskTitle: vacancy.taskTitle,
            userId: userInterest.userId,
            userName: userInterest.userName,
            skillId: vacancy.skillId,
            startDate: userInterest.startDate,
            endDate: userInterest.endDate,
          });
        });
    });
};

const calcActualAvailabilityAndShortFallInfo = () => {
  for (let seriesIndex = 0; seriesIndex < skills.length; seriesIndex++) {
    for (let dayIndex = 0; dayIndex < seriesSets.availability.series[0].data.length; dayIndex++) {
      const availabilityDayData = seriesSets.availability.series[seriesIndex].data[dayIndex];
      const signedUpDayData = seriesSets.signedUp.series[seriesIndex].data[dayIndex];
      const actualAvailabilityDayData =
        seriesSets.actualAvailability.series[seriesIndex].data[dayIndex];
      const vacanciesDayData = seriesSets.vacancies.series[seriesIndex].data[dayIndex];
      const shortfallDayData = seriesSets.shortfall.series[seriesIndex].data[dayIndex];
      const excessDayData = seriesSets.excess.series[seriesIndex].data[dayIndex];

      actualAvailabilityDayData.y = availabilityDayData.y - signedUpDayData.y;

      const shortFall = vacanciesDayData.y - availabilityDayData.y;

      shortfallDayData.y = shortFall <= 0 ? 0 : shortFall;
      excessDayData.y = shortFall >= 0 ? 0 : Math.abs(shortFall);
    }
  }
};

const findLastIndex = (array, findFunction) => {
  let i = array.length - 1;
  for (i; i >= 0; i--) {
    if (findFunction(array[i])) {
      break;
    }
  }
  return i;
};

const trimAndFilterSeriesSet = (seriesSet, filterDateRange, isInspectorData) => {
  seriesSet.series.forEach((series) => {
    if (typeof series.data !== 'undefined') {
      const firstIndexSpecifiedByFilter =
        typeof filterDateRange === 'undefined' ||
        filterDateRange === null ||
        filterDateRange.startDate === null
          ? 0
          : series.data.findIndex((d) => d.x >= filterDateRange.startDate.getTime());
      const firstNonEmptyIndex = series.data.findIndex((d) =>
        isInspectorData
          ? d.availability.length > 0 || d.signedUp.length > 0 || d.vacancies.length > 0
          : d.y !== 0
      );

      const lastIndexSpecifiedByFilter =
        typeof filterDateRange === 'undefined' ||
        filterDateRange === null ||
        filterDateRange.endDate === null
          ? series.data.length
          : series.data.findIndex((d) => d.x > filterDateRange.endDate.getTime());

      const lastNonEmptyIndex = findLastIndex(series.data, (d) =>
        isInspectorData
          ? d.availability.length > 0 || d.signedUp.length > 0 || d.vacancies.length > 0
          : d.y !== 0
      );

      const first = Math.max(
        ...[0, firstIndexSpecifiedByFilter, firstNonEmptyIndex].filter((x) => x !== -1)
      );
      const last =
        Math.min(
          ...[series.data.length - 1, lastIndexSpecifiedByFilter, lastNonEmptyIndex].filter(
            (x) => x !== -1
          )
        ) + 1;

      series.data = series.data.slice(first, last);

      if (!isInspectorData) {
        series.data = series.data.filter((d) => d.y !== 0);
      }
    }
  });
};

const findStartAndEndDates = (seriesSet) => {
  let min = seriesSet.series
    .map((series) =>
      series.data.reduce((previous, current) => (current.y < previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current < previous ? current : previous), 0);
  const max = seriesSet.series
    .map((series) =>
      series.data.reduce((previous, current) => (current.y > previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current > previous ? current : previous), 0);
  // zero entries do not mark on the charts
  if (min === 0) min = 1;
  seriesSet.min = min;
  seriesSet.max = max;
};

const cleanSeriesSets = (filterDateRange) => {
  trimAndFilterSeriesSet(seriesSets.availability, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.signedUp, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.actualAvailability, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.vacancies, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.shortfall, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.excess, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.inspectorData, filterDateRange, true);
  findStartAndEndDates(seriesSets.signedUp);
  findStartAndEndDates(seriesSets.availability);
  findStartAndEndDates(seriesSets.vacancies);
  findStartAndEndDates(seriesSets.actualAvailability);
  findStartAndEndDates(seriesSets.shortfall);
  findStartAndEndDates(seriesSets.excess);
};

export const buildChartData = (
  vacanciesIn,
  interestIn,
  usersIn,
  dateRangeIn,
  requiredSkills,
  filterDateRange
) => {
  vacancies = vacanciesIn;
  interest = interestIn;
  users = usersIn;
  dateRange = dateRangeIn;
  skills = requiredSkills;
  skillIds = skills.map((skill) => skill.id);

  createSeriesTemplates();
  addAvailabilityInfo();
  addVacanciesAndInterestInfo();
  calcActualAvailabilityAndShortFallInfo();
  cleanSeriesSets(filterDateRange);

  return seriesSets;
};
