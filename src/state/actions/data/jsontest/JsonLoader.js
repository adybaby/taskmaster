import { stringDatesToRealDates } from '../../../../util/Dates';

import tasksFile from './tasks.json';
import usersFile from './users.json';
import contributionLinksFile from './contribution_links.json';
import vacanciesFile from './vacancies.json';
import interestFile from './interest.json';
import skillsFile from './skills.json';

export const loadAll = () =>
  new Promise((resolve) => {
    const tasks = stringDatesToRealDates(tasksFile);
    const users = stringDatesToRealDates(usersFile);
    const skills = stringDatesToRealDates(skillsFile).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const vacancies = stringDatesToRealDates(vacanciesFile);
    const interest = stringDatesToRealDates(interestFile);
    const contributionLinks = stringDatesToRealDates(contributionLinksFile);

    resolve({
      tasks,
      users,
      skills,
      vacancies,
      interest,
      contributionLinks,
    });
  });
