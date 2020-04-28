import { TASK_TYPE, VACANCY } from '../../../../constants/Constants';

const DEFAULT_FILTER_ID = 'ANY_VACANCIES';

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

export const createVacancySelectFilterControl = (tasks, currentUser) => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'any skills',
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
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
