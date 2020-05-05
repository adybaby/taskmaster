import { TASK_TYPE, VACANCY } from '../../../../constants/Constants';

const createExecute = (skills) => (tasks) =>
  tasks.filter(
    (task) =>
      task.type === TASK_TYPE.INITIATIVE &&
      task.vacancies.length > 0 &&
      task.vacancies.filter(
        (vacancy) =>
          vacancy.status === VACANCY.FIELDS.STATUS.OPEN.id && skills.includes(vacancy.skill)
      ).length > 0
  );

const getSkillVacancies = (tasks) =>
  [
    ...new Set(
      tasks
        .filter((task) => task.type === TASK_TYPE.INITIATIVE && task.vacancies.length > 0)
        .map((task) => task.vacancies.map((vacancy) => vacancy.skill))
        .flat()
    ),
  ].sort();

export const createVacancyFilterOptions = (tasks, currentUser) => [
  {
    id: 'ANY_VACANCIES',
    label: 'any skills',
    execute: null,
  },
  {
    id: 'MY_SKILLS',
    label: 'my skills',
    execute: createExecute(currentUser.skills),
  },
  ...getSkillVacancies(tasks).map((skillVacancy) => ({
    id: skillVacancy,
    label: `${skillVacancy}`,
    execute: createExecute([skillVacancy]),
  })),
];
