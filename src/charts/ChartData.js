/* eslint-disable no-param-reassign */
// import { formatDate } from '../util/DateFormatting';

let startedInit = false;
let init = false;
let availability = null;
let signedUp = null;
let actualAvailability = null;
let vacancies = null;
let shortfall = null;

const sort = target => {
  target.forEach(entry => {
    entry.data.sort((a, b) => a.x - b.x);
  });
};

const getFirstSecondDates = series => {
  let firstDate = null;
  let secondDate = null;
  series.forEach(entry => {
    if (entry.data.length > 0) {
      const entryFirstDate = entry.data[0].x;
      const entryLastDate = entry.data[entry.data.length - 1].x;
      if (firstDate === null || entryFirstDate < firstDate) {
        firstDate = entryFirstDate;
      }
      if (secondDate === null || entryLastDate > secondDate) {
        secondDate = entryLastDate;
      }
    }
  });
  return { firstDate, secondDate };
};

const pad = (series, i) => {
  series.forEach(entry => {
    const date = entry.data.filter(d => d.x === i.getTime())[0];
    if (typeof date === 'undefined') {
      entry.data.push({ x: i.getTime(), y: 0 });
    }
  });
};

const padAvailabilityAndVacancies = () => {
  let { firstDate, secondDate } = getFirstSecondDates(availability);
  const vDates = getFirstSecondDates(vacancies);
  if (vDates.firstDate < firstDate) {
    firstDate = vDates.firstDate;
  }
  if (vDates.secondDate > secondDate) {
    secondDate = vDates.secondDate;
  }
  for (
    let i = new Date(firstDate);
    i.getTime() <= new Date(secondDate).getTime();
    i.setDate(i.getDate() + 1)
  ) {
    pad(availability, i);
    pad(vacancies, i);
  }
  sort(availability);
  sort(vacancies);
};

const calcAvailabilityForUserSkill = (user, skill) => {
  const skillEntry = availability.filter(a => a.label === skill)[0];
  user.available.forEach(available => {
    for (
      let i = new Date(available.from);
      i <= new Date(available.to);
      i.setDate(i.getDate() + 1)
    ) {
      const dayData = skillEntry.data.filter(sed => sed.x === i.getTime())[0];
      if (typeof dayData !== 'undefined') {
        dayData.y++;
      } else {
        skillEntry.data.push({ x: i.getTime(), y: 1 });
      }
    }
  });

  const signedUpForSkill = signedUp.filter(su => su.label === skill)[0];

  user.signedUp.forEach(su => {
    su.periods.forEach(period => {
      for (let i = new Date(period.from); i <= new Date(period.to); i.setDate(i.getDate() + 1)) {
        const signedUpDay = signedUpForSkill.data.filter(s => s.x === i.getTime())[0];
        if (typeof signedUpDay !== 'undefined') {
          signedUpDay.y++;
        } else {
          signedUpForSkill.data.push({ x: i.getTime(), y: 1 });
        }
      }
    });
  });
};

const calcAvailability = (users, skills) => {
  availability = [...skills.map(skill => ({ label: skill, data: [] }))];
  signedUp = [...skills.map(skill => ({ label: skill, data: [] }))];
  users.forEach(user => {
    user.skills.forEach(skill => {
      calcAvailabilityForUserSkill(user, skill);
    });
  });
  sort(signedUp);
  sort(availability);
};

const calcVacancies = (tasks, skills) => {
  vacancies = [...skills.map(ns => ({ label: ns, data: [] }))];
  vacancies.forEach(vacancy => {
    tasks
      .filter(task => task.type === 'Initiative')
      .forEach(task => {
        task.vacancies
          .filter(v => v.title === vacancy.label)
          .filter(v => v.status === 'V')
          .forEach(() => {
            for (
              let i = new Date(task.startDate);
              i <= new Date(task.endDate);
              i.setDate(i.getDate() + 1)
            ) {
              const sdEntry = vacancy.data.filter(v => v.x === i.getTime());
              if (sdEntry.length > 0) {
                sdEntry[0].y++;
              } else {
                vacancy.data.push({ x: i.getTime(), y: 1 });
              }
            }
          });
      });
  });
  sort(vacancies);
};

const calcShortFall = skills => {
  shortfall = [...skills.map(ns => ({ label: ns, data: [] }))];
  actualAvailability = [...skills.map(ns => ({ label: ns, data: [] }))];

  padAvailabilityAndVacancies();

  availability.forEach(availableSeries => {
    const signedUpForSkill = signedUp.filter(su => su.label === availableSeries.label)[0];
    const actualAvailabilityForSkill = actualAvailability.filter(
      aa => aa.label === availableSeries.label
    )[0];
    availableSeries.data.forEach(day => {
      const signedUpForDay = signedUpForSkill.data.filter(d => d.x === day.x)[0];
      const deduct = typeof signedUpForDay === 'undefined' ? 0 : signedUpForDay.y;
      actualAvailabilityForSkill.data.push({ x: day.x, y: day.y - deduct });
    });
  });

  vacancies.forEach(vacancySeries => {
    const sfEntry = shortfall.filter(sf => sf.label === vacancySeries.label)[0];
    vacancySeries.data.forEach(vsData => {
      let deduct = 0;
      const dayAvailable = actualAvailability
        .filter(availableSeries => availableSeries.label === vacancySeries.label)[0]
        .data.filter(asData => asData.x === vsData.x)[0];
      if (typeof dayAvailable !== 'undefined') {
        deduct = dayAvailable.y;
      }
      sfEntry.data.push({ x: vsData.x, y: vsData.y - deduct });
    });
  });

  sort(actualAvailability);
  sort(shortfall);
};

export const buildChartData = (users, tasks, skills) => {
  if (!startedInit && !init) {
    startedInit = true;
    calcAvailability(users, skills);
    calcVacancies(tasks, skills);
    calcShortFall(skills);
    init = true;
    /**
    console.log('vacancies');
    console.log(
      vacancies.map(v => ({
        label: v.label,
        data: v.data.map(d => ({ x: formatDate(new Date(d.x)), y: d.y }))
      }))
    );
    console.log('availability');
    console.log(
      availability.map(v => ({
        label: v.label,
        data: v.data.map(d => ({ x: formatDate(new Date(d.x)), y: d.y }))
      }))
    );
    console.log('shortfall');
    console.log(
      shortfall.map(v => ({
        label: v.label,
        data: v.data.map(d => ({ x: formatDate(new Date(d.x)), y: d.y }))
      }))
    );
    console.log('signedUp');
    console.log(
      signedUp.map(v => ({
        label: v.label,
        data: v.data.map(d => ({ x: formatDate(new Date(d.x)), y: d.y }))
      }))
    );
    console.log('actualAvailability');
    console.log(
      actualAvailability.map(v => ({
        label: v.label,
        data: v.data.map(d => ({ x: formatDate(new Date(d.x)), y: d.y }))
      }))
    );
    * */
  }
};

export const getTotalVacancies = () => {
  return vacancies;
};

export const getTotalAvailability = () => {
  return availability;
};

export const getSignedUp = () => {
  return signedUp;
};

export const getActualAvailability = () => {
  return actualAvailability;
};

export const getTotalShortfall = () => {
  return shortfall;
};
