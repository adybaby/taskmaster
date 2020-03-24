/* eslint-disable no-param-reassign */
let tasks = null;
let users = null;
let dateRange = null;
let skills = null;

let startedInit = false;
let init = false;

let availability = null;
let signedUp = null;
let actualAvailability = null;
let vacancies = null;
let shortfall = null;
let skillsAndColors = null;

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
  '#2B3D26'
];

const xyTemplate = () => {
  const xy = [];
  for (
    let i = new Date(dateRange.first);
    i.getTime() <= new Date(dateRange.last).getTime();
    i.setDate(i.getDate() + 1)
  ) {
    xy.push({ x: i.getTime(), y: 0, signUps: [], vacancies: [] });
  }
  return xy;
};

const minMax = seriesSet => {
  seriesSet.min = seriesSet
    .map(series =>
      series.data.reduce((previous, current) => (current.y < previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current < previous ? current : previous), 0);
  seriesSet.max = seriesSet
    .map(series =>
      series.data.reduce((previous, current) => (current.y > previous ? current.y : previous), 0)
    )
    .reduce((previous, current) => (current > previous ? current : previous), 0);
};

const getSkillsAndColors = () =>
  skills.map((skill, index) => ({ title: skill, color: KELLY[index], strokeWidth: 15 }));

/**
 * {label:string, color:#string, data:[{x,y}]}
 * */
const seriesTemplate = () => {
  const template = skills.map((skill, index) => ({
    label: skill,
    color: KELLY[index],
    data: xyTemplate()
  }));
  template.min = 0;
  template.max = 0;
  return template;
};

const createSeriesTemplates = () => {
  skillsAndColors = getSkillsAndColors();
  availability = seriesTemplate();
  signedUp = seriesTemplate();
  actualAvailability = seriesTemplate();
  vacancies = seriesTemplate();
  shortfall = seriesTemplate();
};

const updateXY = (from, to, data, signUp, vacancy) => {
  let i = data.findIndex(d => d.x === new Date(from).getTime());
  const end = data.findIndex(d => d.x === new Date(to).getTime());
  for (i; i <= end; i++) {
    // eslint-disable-next-line no-param-reassign
    data[i].y++;
    if (signUp !== null) data[i].signUps.push(signUp);
    if (vacancy !== null) {
      const entry = data[i].vacancies.filter(v => v.task.id === vacancy.task.id)[0];
      if (typeof entry === 'undefined') {
        vacancy.count = 1;
        data[i].vacancies.push({ ...vacancy });
      } else {
        entry.count += 1;
      }
    }
  }
};

const calcAvailability = () => {
  users.forEach(user => {
    user.skills.forEach(skill => {
      const availabilityEntry = availability.filter(a => a.label === skill)[0];
      const signedUpEntry = signedUp.filter(su => su.label === skill)[0];

      user.available.forEach(available => {
        updateXY(
          available.from,
          available.to,
          availabilityEntry.data,
          { user, signUp: null },
          null
        );
      });

      user.signedUp.forEach(su => {
        su.periods.forEach(period => {
          updateXY(period.from, period.to, signedUpEntry.data, { user, signUp: su }, null);
        });
      });
    });
  });
  minMax(signedUp);
  minMax(availability);
};

const calcVacancies = () => {
  vacancies.forEach(vacancy => {
    tasks
      .filter(task => task.type === 'Initiative')
      .forEach(task => {
        task.vacancies
          .filter(v => v.title === vacancy.label)
          .filter(v => v.status === 'V')
          .forEach(v => {
            updateXY(task.startDate, task.endDate, vacancy.data, null, { task, vacancy: v });
          });
      });
  });
  minMax(vacancies);
};

const calcActualAvailabilityAndShortFall = () => {
  for (let skillIndex = 0; skillIndex < skills.length; skillIndex++) {
    for (let dayIndex = 0; dayIndex < availability[0].data.length; dayIndex++) {
      actualAvailability[skillIndex].data[dayIndex].y =
        availability[skillIndex].data[dayIndex].y - signedUp[skillIndex].data[dayIndex].y;

      actualAvailability[skillIndex].data[dayIndex].vacancies =
        vacancies[skillIndex].data[dayIndex].vacancies;

      actualAvailability[skillIndex].data[dayIndex].signUps =
        signedUp[skillIndex].data[dayIndex].signUps;

      shortfall[skillIndex].data[dayIndex].y =
        vacancies[skillIndex].data[dayIndex].y - actualAvailability[skillIndex].data[dayIndex].y;

      shortfall[skillIndex].data[dayIndex].vacancies =
        vacancies[skillIndex].data[dayIndex].vacancies;

      shortfall[skillIndex].data[dayIndex].signUps = signedUp[skillIndex].data[dayIndex].signUps;
    }
  }
  minMax(actualAvailability);
  minMax(shortfall);
};

export const buildChartData = (tasksIn, usersIn, dateRangeIn, skillsIn) => {
  if (!startedInit && !init) {
    startedInit = true;
    tasks = tasksIn;
    users = usersIn;
    dateRange = dateRangeIn;
    skills = skillsIn;
    createSeriesTemplates();
    calcAvailability();
    calcVacancies();
    calcActualAvailabilityAndShortFall();
    init = true;
  }
  return { availability, signedUp, vacancies, actualAvailability, shortfall, skillsAndColors };
};
