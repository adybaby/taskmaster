import * as TASK_TYPES from '../fields/Type';
import { KEYS as VACANCY_KEYS } from '../fields/Vacancies';

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

const KELLY = [
  '#F2F3F4',
  '#222222',
  '#F3C300',
  '#875692',
  '#F38400',
  '#A1CAF1',
  '#BE0032',
  '#C2B280',
  '#848482',
  '#008856',
  '#E68FAC',
  '#0067A5',
  '#F99379',
  '#604E97',
  '#F6A600',
  '#B3446C',
  '#DCD300',
  '#882D17',
  '#8DB600',
  '#654522',
  '#E25822',
  '#2B3D26',
];

const xyTemplate = (makeRefs) => {
  const xy = [];
  for (
    let i = new Date(dateRange.all.first);
    i.getTime() <= new Date(dateRange.all.last).getTime();
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

const minMax = (seriesSet) => {
  seriesSet.min = seriesSet
    .map((series) =>
      series.data.reduce((previous, current) => (current.y < previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current < previous ? current : previous), 0);
  seriesSet.max = seriesSet
    .map((series) =>
      series.data.reduce((previous, current) => (current.y > previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current > previous ? current : previous), 0);
};

const updateXY = (from, to, seriesSetKey, skillsIndex, signUp, vacancy) => {
  const { data } = seriesSets[seriesSetKey][skillsIndex];
  const refData = seriesSets.refs[skillsIndex].data;

  let i = data.findIndex((d) => d.x === new Date(from).getTime());
  const end = data.findIndex((d) => d.x === new Date(to).getTime());
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
  minMax(seriesSets.signedUp);
  minMax(seriesSets.availability);
};

const calcVacancies = () => {
  seriesSets.vacancies.forEach((vacancy, skillsIndex) => {
    tasks
      .filter((task) => task.type === TASK_TYPES.INITIATIVE)
      .forEach((task) => {
        task.vacancies
          .filter((v) => v.title === vacancy.label)
          .filter((v) => v.status === VACANCY_KEYS.STATUS.VACANT.key || Array.isArray(v.status))
          .forEach((v) => {
            updateXY(task.startDate, task.endDate, 'vacancies', skillsIndex, null, {
              task,
              vacancy: v,
            });
          });
      });
  });
  minMax(seriesSets.vacancies);
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
  minMax(seriesSets.actualAvailability);
  minMax(seriesSets.shortfall);
};

const removeDatesOutsideTaskRange = (filterDateRange) => {
  const range = {
    first: filterDateRange.from !== null ? filterDateRange.from.getTime() : dateRange.all.first,
    last: filterDateRange.to !== null ? filterDateRange.to.getTime() : dateRange.all.last,
  };
  Object.entries(seriesSets).forEach(([key]) => {
    seriesSets[key].forEach((series, index) => {
      if (typeof series.data !== 'undefined') {
        const first = series.data.findIndex((d) => d.x >= range.first);
        const last = series.data.findIndex((d) => d.x > range.last);
        seriesSets[key][index].data = series.data.slice(first, last);
      }
    });
  });
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
  if (filterDateRange !== null) {
    removeDatesOutsideTaskRange(filterDateRange);
  }
  return seriesSets;
};
