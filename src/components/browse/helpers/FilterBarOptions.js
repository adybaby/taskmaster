import * as TASK_FILTERS from '../../../constants/TaskFilters';
import { getNeededSkills } from '../../../util/Vacancies';
import { filterTasksByDate } from '../../../util/Dates';

export const getVacancyOptions = (visibleTasksOmitVacancies, tasks, currentUser) => {
  const countSkillVacancies = (skills) => {
    let count = 0;
    const tasksWithVacs = visibleTasksOmitVacancies.filter(
      (vt) =>
        typeof vt.vacancies !== 'undefined' && vt.vacancies !== null && vt.vacancies.length > 0
    );
    skills.forEach((skill) => {
      tasksWithVacs.forEach((twv) => {
        count += twv.vacancies.filter((v) => v.title === skill).length;
      });
    });

    return count;
  };

  const list = [];

  getNeededSkills(tasks).forEach((ns) => {
    const count = countSkillVacancies([ns]);
    if (count !== 0) {
      list.push({
        label: `${ns} (${count})`,
        value: ns,
      });
    }
  });
  list.sort();

  list.unshift({
    label: `My Skills (${countSkillVacancies(currentUser.skills)})`,
    value: 'MY_SKILLS',
  });
  list.unshift({
    label: 'Any Vacancies..',
    value: 'ANY_VACANCIES',
  });

  return list;
};

export const getCreatedByOptions = (visibleTasksOmitCreatedBy, users) => {
  const countCreatedBy = (id) =>
    visibleTasksOmitCreatedBy.filter((task) => task.createdBy === id).length;

  const list = [];

  users.forEach((user) => {
    const count = countCreatedBy(user.id);
    if (count !== 0) {
      list.push({
        label: `${user.name} (${count})`,
        value: user.id,
      });
    }
  });

  list.sort();

  list.unshift({
    label: TASK_FILTERS.DEFAULTS.CREATED_BY.value,
    value: TASK_FILTERS.DEFAULTS.CREATED_BY.value,
  });

  return list;
};

export const getDateOptions = (visibleTasks, dateField, includeFuture) => {
  const countDate = (value) => {
    return filterTasksByDate(visibleTasks, value.query, dateField).length;
  };

  const list = [];

  Object.entries(TASK_FILTERS.DATE_OPTIONS).forEach((entry) => {
    if (!(!includeFuture && entry.future)) {
      const count = countDate(entry[1]);
      const countLabel = count === 0 ? '' : ` (${count})`;
      list.push({
        label: `${entry[1].label}${countLabel}`,
        value: entry[0],
      });
    }
  });

  return list;
};
