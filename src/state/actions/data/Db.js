import { loadAll as loadAllFromServer, overwriteDb } from './server/DataInterface';
import { loadAll as loadAllFromJson } from './jsontest/JsonLoader';
import { denormaliseLinks } from './Denormaliser';
import { prioritise } from './Prioritiser';
import { firstLastDates } from '../../../util/Dates';

export const overwriteDbWithJsonFiles = () =>
  new Promise((resolve, reject) => {
    loadAllFromJson()
      .then((data) => {
        overwriteDb(data)
          .then(() => resolve())
          .catch((e) => reject(e));
      })
      .catch((e) => {
        reject(e);
      });
  });

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
