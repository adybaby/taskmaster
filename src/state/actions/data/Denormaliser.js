import { formatUserName } from '../../../util/Users';
import { VACANCY_STATUS } from '../../../constants/Constants';

const getContributionLinks = (
  taskId,
  taskType,
  thisTaskField,
  linkedTasksField,
  tasks,
  contributionLinks
) =>
  contributionLinks
    .filter((cl) => cl[thisTaskField] === taskId)
    .map((cl) => ({
      id: cl[linkedTasksField],
      title: tasks.find((t) => t.id === cl[linkedTasksField]).title,
      contribution: cl.contribution,
      contributorContributions:
        taskType === 'DRIVER'
          ? getContributionLinks(
              cl.contributorId,
              'ENABLER',
              'contributeeId',
              'contributorId',
              tasks,
              contributionLinks
            )
          : undefined,
    }));

export const denormaliseLinks = (
  normalTasks,
  normalUsers,
  normalSkills,
  normalVacancies,
  normalInterest,
  normalContributionLinks
) => {
  const users = normalUsers.map((user) => ({
    ...user,
    skills: user.skills.map((userSkillId) =>
      normalSkills.find((skill) => skill.id === userSkillId)
    ),
    formattedName: formatUserName(user),
    formattedFullName: [...user.firstNames, user.lastName].join(' '),
    authored: normalTasks
      .filter((task) => task.createdBy === user.id)
      .map((task) => ({ id: task.id, title: task.title })),
    signedUp: normalInterest
      .filter((userInterest) => userInterest.userId === user.id)
      .map((userInterest) => ({
        startDate: userInterest.startDate,
        endDate: userInterest.endDate,
        ...(({ id, title }) => ({ id, title }))(
          normalTasks.find(
            (task) =>
              task.id ===
              normalVacancies.find((vacancy) => vacancy.id === userInterest.vacancyId).taskId
          )
        ),
      })),
  }));

  const tasks = normalTasks.map((normalTask) => {
    let taskVacancies = [];
    let requiredSkills = [];

    if (normalTask.type === 'INITIATIVE') {
      taskVacancies = normalVacancies
        .filter((vacancy) => vacancy.taskId === normalTask.id)
        .map((vacancy) => ({
          priority: vacancy.priority,
          startDate: vacancy.startDate,
          endDate: vacancy.endDate,
          status: vacancy.status,
          skillId: vacancy.skillId,
          skillTitle: normalSkills.find((skill) => skill.id === vacancy.skillId).title,
        }));

      // count the number of distinct skills vacant in this task
      const requiredSkillsWithDupes = taskVacancies
        .filter((tv) => tv.status === VACANCY_STATUS.OPEN)
        .map((tv) => tv.skillId);
      const requiredSkillsCounts = {};
      for (let i = 0; i < requiredSkillsWithDupes.length; i++) {
        requiredSkillsCounts[requiredSkillsWithDupes[i]] =
          1 + requiredSkillsCounts[requiredSkillsWithDupes[i]] || 1;
      }
      requiredSkills = Object.entries(requiredSkillsCounts).map(([key, value]) => ({
        id: key,
        title: normalSkills.find((skill) => skill.id === key).title,
        count: value,
      }));
    }

    return {
      ...normalTask,
      createdByName: users.find((user) => user.id === normalTask.createdBy).formattedName,
      modifiedByName: users.find((user) => user.id === normalTask.modifiedBy).formattedName,
      vacancies: taskVacancies,
      requiredSkills,
      contributions:
        normalTask.type !== 'INITIATIVE'
          ? getContributionLinks(
              normalTask.id,
              normalTask.type,
              'contributeeId',
              'contributorId',
              normalTasks,
              normalContributionLinks
            )
          : [],
      contributesTo:
        normalTask.type !== 'DRIVER'
          ? getContributionLinks(
              normalTask.id,
              normalTask.type,
              'contributorId',
              'contributeeId',
              normalTasks,
              normalContributionLinks
            )
          : [],
    };
  });

  const vacancies = normalVacancies.map((nv) => ({
    ...nv,
    taskTitle: tasks.find((task) => task.id === nv.taskId).title,
    skillTitle: normalSkills.find((skill) => skill.id === nv.skillId).title,
  }));

  const interest = normalInterest.map((ni) => {
    const vacancy = vacancies.find((v) => v.id === ni.vacancyId);
    return {
      ...ni,
      taskId: vacancy.taskId,
      taskTitle: vacancy.taskTitle,
      userName: users.find((u) => u.id === ni.userId).formattedName,
    };
  });

  return { users, tasks, interest, vacancies };
};
