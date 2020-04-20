import * as TASK_TYPES from '../fields/Type';
import { FIELDS as VACANCY_FIELDS } from '../fields/Vacancies';
import { KELLY } from '../../styles/Styles';

/* eslint-disable no-param-reassign */
let tasks = null;
let users = null;
let dateRange = null;
let skills = null;

const seriesSets = {
  availability: null,
  signedUp: null,
  actualAvailability: null,
  vacancies: null,
  shortfall: null,
  refs: null,
  skillsAndColors: null,
};

const xyTemplate = (makeRefs) => {
  const xy = [];
  for (
    let i = new Date(dateRange.first.getTime());
    i.getTime() <= dateRange.last.getTime();
    i.setDate(i.getDate() + 1)
  ) {
    if (makeRefs) {
      xy.push({ x: i.getTime(), y: 0, signUps: [], vacancies: [], stated: [] });
    } else {
      xy.push({ x: i.getTime(), y: 0 });
    }
  }
  return xy;
};

const getSkillsAndColors = () =>
  skills.map((skill, index) => ({ title: skill, color: KELLY[index], strokeWidth: 15 }));

/**
 * {label:string, color:#string, data:[{x,y}]}
 * */
const seriesTemplate = (makeRefs) => {
  const template = skills.map((skill, index) => ({
    label: skill,
    color: KELLY[index],
    data: xyTemplate(makeRefs),
  }));
  template.min = 0;
  template.max = 0;
  return template;
};

const createSeriesTemplates = () => {
  seriesSets.skillsAndColors = getSkillsAndColors();
  seriesSets.availability = seriesTemplate(false);
  seriesSets.signedUp = seriesTemplate(false);
  seriesSets.actualAvailability = seriesTemplate(false);
  seriesSets.vacancies = seriesTemplate(false);
  seriesSets.shortfall = seriesTemplate(false);
  seriesSets.refs = seriesTemplate(true);
};

const updateXY = (from, to, seriesSetKey, skillsIndex, signUp, vacancy) => {
  const { data } = seriesSets[seriesSetKey][skillsIndex];
  const refData = seriesSets.refs[skillsIndex].data;

  let i = data.findIndex((d) => d.x === from.getTime());
  const end = data.findIndex((d) => d.x === to.getTime());
  for (i; i <= end; i++) {
    data[i].y++;
    if (signUp !== null) {
      if (signUp.signUp !== null) {
        refData[i].signUps.push(signUp);
      } else {
        refData[i].stated.push(signUp);
      }
    }
    if (vacancy !== null) {
      const refVacancies = refData[i].vacancies;
      const entry = refVacancies.filter((v) => v.task.id === vacancy.task.id)[0];
      if (typeof entry === 'undefined') {
        vacancy.count = 1;
        refVacancies.push({ ...vacancy });
      } else {
        entry.count += 1;
      }
    }
  }
};

const calcAvailability = () => {
  users.forEach((user) => {
    user.skills.forEach((skill) => {
      const skillsIndex = skills.indexOf(skill);

      user.available.forEach((available) => {
        updateXY(
          available.from,
          available.to,
          'availability',
          skillsIndex,
          { user, signUp: null },
          null
        );
      });

      user.signedUp.forEach((su) => {
        su.periods.forEach((period) => {
          updateXY(period.from, period.to, 'signedUp', skillsIndex, { user, signUp: su }, null);
        });
      });
    });
  });
};

const calcVacancies = () => {
  skills.forEach((skill, skillsIndex) => {
    tasks
      .filter((task) => task.type === TASK_TYPES.INITIATIVE)
      .forEach((task) => {
        task.vacancies
          .filter((vacancy) => vacancy.skill === skill)
          .filter((vacancy) => vacancy.status === VACANCY_FIELDS.STATUS.OPEN.id)
          .forEach((vacancy) => {
            updateXY(task.startDate, task.endDate, 'vacancies', skillsIndex, null, {
              task,
              vacancy,
            });
          });
      });
  });
};

const calcActualAvailabilityAndShortFall = () => {
  for (let skillIndex = 0; skillIndex < skills.length; skillIndex++) {
    for (let dayIndex = 0; dayIndex < seriesSets.availability[0].data.length; dayIndex++) {
      const availabilityDayData = seriesSets.availability[skillIndex].data[dayIndex];
      const signedUpDayData = seriesSets.signedUp[skillIndex].data[dayIndex];
      const actualAvailabilityDayData = seriesSets.actualAvailability[skillIndex].data[dayIndex];
      const vacanciesDayData = seriesSets.vacancies[skillIndex].data[dayIndex];
      const shortfallDayData = seriesSets.shortfall[skillIndex].data[dayIndex];

      actualAvailabilityDayData.y = availabilityDayData.y - signedUpDayData.y;
      shortfallDayData.y = vacanciesDayData.y - availabilityDayData.y;
    }
  }
};

const trimAndFilterSeriesSet = (seriesSet, filterDateRange) => {
  seriesSet.forEach((series) => {
    if (typeof series.data !== 'undefined') {
      const attemptedFirst =
        typeof filterDateRange === 'undefined' ||
        filterDateRange === null ||
        filterDateRange.from === null
          ? 0
          : series.data.findIndex((d) => d.x >= filterDateRange.from.getTime());
      const attemptedLast =
        typeof filterDateRange === 'undefined' ||
        filterDateRange === null ||
        filterDateRange.to === null
          ? series.data.length
          : series.data.findIndex((d) => d.x > filterDateRange.to.getTime());
      const first = attemptedFirst === -1 ? 0 : attemptedFirst;
      const last = attemptedLast === -1 ? series.data.length : attemptedLast;
      series.data = series.data.slice(first, last).filter((d) => d.y !== 0);
    }
  });
};

const trimAndFilterSeriesSets = (filterDateRange) => {
  trimAndFilterSeriesSet(seriesSets.availability, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.signedUp, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.actualAvailability, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.vacancies, filterDateRange);
  trimAndFilterSeriesSet(seriesSets.shortfall, filterDateRange);
};

const minMax = (seriesSet) => {
  let min = seriesSet
    .map((series) =>
      series.data.reduce((previous, current) => (current.y < previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current < previous ? current : previous), 0);
  const max = seriesSet
    .map((series) =>
      series.data.reduce((previous, current) => (current.y > previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current > previous ? current : previous), 0);
  // zero entries do not mark on the charts
  if (min === 0) min = 1;
  seriesSet.min = min;
  seriesSet.max = max;
};

const calcMinMaxYValues = () => {
  minMax(seriesSets.signedUp);
  minMax(seriesSets.availability);
  minMax(seriesSets.vacancies);
  minMax(seriesSets.actualAvailability);
  minMax(seriesSets.shortfall);
};

export const buildChartData = (tasksIn, usersIn, dateRangeIn, skillsIn, filterDateRange) => {
  tasks = tasksIn;
  users = usersIn;
  dateRange = dateRangeIn;
  skills = skillsIn;
  createSeriesTemplates();
  calcAvailability();
  calcVacancies();
  calcActualAvailabilityAndShortFall();
  trimAndFilterSeriesSets(filterDateRange);
  calcMinMaxYValues();
  return seriesSets;
};
