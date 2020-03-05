/* eslint-disable no-param-reassign */

import { formatDate } from '../util/DateFormatting';

const addToAvailableSkillsEntry = (skillEntry, user) => {
  const availables = [];
  const signedUps = [];

  user.available.forEach(available => {
    for (
      let i = new Date(available.from);
      i <= new Date(available.to);
      i.setDate(i.getDate() + 1)
    ) {
      const entry = availables.filter(a => a.day.getTime() === i.getTime());
      if (entry.length > 0) {
        entry.count++;
      } else {
        availables.push({ day: new Date(i.getTime()), count: 1 });
      }
    }
  });

  user.signedUp.forEach(signedUp => {
    signedUp.periods.forEach(period => {
      for (let i = new Date(period.from); i <= new Date(period.to); i.setDate(i.getDate() + 1)) {
        const entry = signedUps.filter(s => s.day.getTime() === i.getTime());
        if (entry.length > 0) {
          entry.count++;
        } else {
          signedUps.push({ day: new Date(i.getTime()), count: 1 });
        }
      }
    });
  });

  availables.forEach(a => {
    let deduct = 0;
    const signedUp = signedUps.filter(s => s.day.getTime() === a.day.getTime());
    if (signedUp.length > 0) {
      deduct = signedUp[0].count;
    }
    const sdEntry = skillEntry.data.filter(se => se.day.getTime() === a.day.getTime());
    if (sdEntry.length > 0) {
      sdEntry[0].count += a.count - deduct;
    } else {
      skillEntry.data.push({ day: a.day, count: a.count - deduct });
    }
  });
};

const calcAvailability = (users, tasks, skills) => {
  const availability = [...skills.map(ns => ({ label: ns, data: [] }))];
  users.forEach(user => {
    user.skills.forEach(skill => {
      const skillEntry = availability.filter(sa => sa.label === skill)[0];
      addToAvailableSkillsEntry(skillEntry, user);
    });
  });
  return availability;
};

const calcRequired = (users, tasks, skills) => {
  const requiredSkills = [...skills.map(ns => ({ label: ns, data: [] }))];
  requiredSkills.forEach(requiredSkill => {
    tasks
      .filter(task => task.type === 'Initiative')
      .forEach(task => {
        task.vacancies
          .filter(v => v.title === requiredSkill.label)
          .filter(v => v.status === 'V')
          .forEach(() => {
            for (
              let i = new Date(task.startDate);
              i <= new Date(task.endDate);
              i.setDate(i.getDate() + 1)
            ) {
              const sdEntry = requiredSkill.data.filter(rs => rs.day.getTime() === i.getTime());
              if (sdEntry.length > 0) {
                sdEntry[0].count++;
              } else {
                requiredSkill.data.push({ day: new Date(i.getTime()), count: 1 });
              }
            }
          });
      });
  });
  return requiredSkills;
};

export const getResourceNeedsData = (users, tasks, skills) => {
  const availability = calcAvailability(users, tasks, skills);
  const required = calcRequired(users, tasks, skills);
  const out = [...skills.map(ns => ({ label: ns, data: [] }))];

  required.forEach(req => {
    const outEntry = out.filter(o => o.label === req.label)[0];
    req.data.forEach(data => {
      let deduct = 0;
      const aEntry = availability
        .filter(a => a.label === req.label)[0]
        .data.filter(d => d.day === data.day)[0];
      if (typeof aEntry !== 'undefined') {
        deduct = aEntry.count;
      }
      outEntry.data.push({ x: data.day, y: data.count - deduct });
    });
    outEntry.data.sort((a, b) => a.x - b.x);
    outEntry.data.forEach(o => {
      o.x = formatDate(o.x);
    });
  });
  return out;
};
