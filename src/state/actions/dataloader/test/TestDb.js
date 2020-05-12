import { min, max } from 'date-fns';
import { TASK_TYPE } from '../../../../constants/Constants';
import { prioritise } from './prioritisation/Prioritise';
import { isValidDateString } from '../../../../util/Dates';
import { rebuildLegacy } from './LegacyAdapter';

import tasksFile from './tasks.json';
import usersFile from './users.json';
import contributionLinksFile from './contribution_links.json';
import vacanciesFile from './vacancies.json';
import interestFile from './interest.json';
import skillsFile from './skills.json';

const firstLastDates = (tasks, users) => {
  const allDates = [
    ...tasks
      .filter((task) => task.type === TASK_TYPE.INITIATIVE)
      .map((task) => [task.startDate, task.endDate])
      .flat(),
    ...users
      .map((user) => user.available.map((available) => [available.from, available.to]))
      .flat(2),
  ];
  return { first: min(allDates), last: max(allDates) };
};

// this second parse is a hack to convert string dates to actual dates without having to mess with webpack
const loadJsonFile = (file) =>
  JSON.parse(JSON.stringify(file), (key, value) =>
    isValidDateString(value) ? new Date(value) : value
  );

export const init = () =>
  new Promise((resolve) => {
    const newTasks = loadJsonFile(tasksFile);
    const newUsers = loadJsonFile(usersFile);
    const newContributionLinks = loadJsonFile(contributionLinksFile);
    const newVacancies = loadJsonFile(vacanciesFile);
    const newInterest = loadJsonFile(interestFile);
    const newSkills = loadJsonFile(skillsFile);

    const { tasks, users, skills } = rebuildLegacy({
      newTasks,
      newUsers,
      newSkills,
      newVacancies,
      newInterest,
      newContributionLinks,
    });

    prioritise(tasks);
    resolve({
      tasks,
      users,
      skills,
      dateRange: firstLastDates(tasks, users),
    });
  });
