import { COST } from '../../../../constants/Constants';

export const rebuildLegacy = ({
  newTasks,
  newUsers,
  newSkills,
  newVacancies,
  newInterest,
  newContributionLinks,
}) => {
  const rebuildLegacyContribution = (link, idField) => {
    const contributionTask = newTasks.find((nt) => nt.id === link[idField]);
    return {
      id: link[idField],
      title: contributionTask.title,
      type: contributionTask.type,
      level:
        link.contribution === 'MAJOR'
          ? 'MA'
          : link.contribution === 'MINOR'
          ? 'MI'
          : link.contribution === 'DERISKING'
          ? 'DR'
          : undefined,
    };
  };

  const legacyTasks = [];
  newTasks.forEach((task) => {
    const legacyTask = { ...task };

    if (typeof legacyTask.cost !== 'undefined') {
      legacyTask.cost = COST.codeForDisplayName(legacyTask.cost);
    }

    if (newContributionLinks.filter((link) => link.contributeeId === task.id).length > 0) {
      legacyTask.contributions = newContributionLinks
        .filter((link) => link.contributeeId === task.id)
        .map((link) => ({
          ...rebuildLegacyContribution(link, 'contributorId'),
          contributions: newContributionLinks
            .filter((iniLink) => iniLink.contributeeId === link.contributorId)
            .map((iniLink) => rebuildLegacyContribution(iniLink, 'contributorId')),
        }));
    }

    if (newContributionLinks.filter((link) => link.contributorId === task.id).length > 0) {
      legacyTask.contributesTo = newContributionLinks
        .filter((link) => link.contributorId === task.id)
        .map((link) => rebuildLegacyContribution(link, 'contributeeId'));
    }

    if (newVacancies.filter((vacancy) => vacancy.taskId === task.id).length > 0) {
      legacyTask.vacancies = newVacancies
        .filter((vacancy) => vacancy.taskId === task.id)
        .map((vacancy) => {
          const { id, taskId, startDate, endDate, comments, skillId, ...legacyVacancy } = vacancy;
          legacyVacancy.skill = newSkills.find((skill) => skill.id === skillId).title;
          legacyVacancy.periods = [
            {
              from: startDate,
              to: endDate,
              priority: vacancy.priority,
              interest: newInterest
                .filter((i) => i.vacancyId === id)
                .map((i) => ({
                  from: i.startDate,
                  to: i.endDate,
                  comments: i.comments,
                  userId: i.userId,
                  status: i.status,
                })),
            },
          ];
          return legacyVacancy;
        });
    }

    legacyTasks.push(legacyTask);
  });

  const legacySkills = newSkills.map((skill) => skill.title);

  const legacyUsers = newUsers.map((user) => ({
    ...user,
    available: user.available.map((available) => ({
      from: available.startDate,
      to: available.endDate,
    })),
    firstName: user.firstNames[0],
    skills: user.skills.map((skillId) => newSkills.find((ns) => ns.id === skillId).title),
    authored: newTasks
      .filter((task) => task.createdBy === user.id)
      .map((task) => ({ id: task.id, title: task.title })),
    signedUp: newInterest
      .filter((i) => i.userId === user.id)
      .map((i) => ({
        id: newVacancies.find((v) => v.id === i.vacancyId).taskId,
        title: newTasks.find((t) => t.id === newVacancies.find((v) => v.id === i.vacancyId).taskId)
          .title,
        periods: [{ from: i.startDate, to: i.endDate }],
      })),
  }));

  return { tasks: legacyTasks, users: legacyUsers, skills: legacySkills };
};
