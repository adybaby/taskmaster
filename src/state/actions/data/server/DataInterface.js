import * as server from './ServerInterface';

export const loadAll = () =>
  new Promise((resolve, reject) => {
    const tasksPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.TASK, {});
    const usersPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.USER, {});
    const skillsPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.SKILL, {});
    const vacanciesPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.VACANCY, {});
    const interestPromise = server.query(server.ACTIONS.FIND, server.ENTITIES.INTEREST, {});
    const contributionLinksPromise = server.query(
      server.ACTIONS.FIND,
      server.ENTITIES.CONTRIBUTION,
      {}
    );

    Promise.all([
      tasksPromise,
      usersPromise,
      skillsPromise,
      vacanciesPromise,
      interestPromise,
      contributionLinksPromise,
    ])
      .then((data) => {
        resolve({
          tasks: data[0],
          users: data[1],
          skills: data[2],
          vacancies: data[3],
          interest: data[4],
          contributionLinks: data[5],
        });
      })
      .catch((e) => {
        reject(e);
      });
  });
