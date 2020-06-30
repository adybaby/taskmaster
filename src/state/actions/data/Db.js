import { loadAll as loadAllFromServer } from './server/DataInterface';
import { denormaliseLinks } from './Denormaliser';
import { prioritise } from './Prioritiser';
import { firstLastDates } from '../../../util/Dates';

export const loadAll = () =>
  new Promise((resolve, reject) => {
    loadAllFromServer()
      .then((data) => {
        const { tasks, users, interest, vacancies } = denormaliseLinks(
          data.tasks,
          data.users,
          data.skills,
          data.vacancies,
          data.interest,
          data.contributionLinks
        );

        const dateRange = firstLastDates(tasks, users);

        prioritise(tasks);

        resolve({
          tasks,
          users,
          skills: data.skills,
          vacancies,
          interest,
          contributionLinks: data.contributionLinks,
          dateRange,
        });
      })
      .catch((e) => {
        reject(e);
      });
  });
