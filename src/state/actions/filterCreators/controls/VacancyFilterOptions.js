import { VACANCY_STATUS } from '../../../../constants/Constants';
import { store } from '../../../Store';

const createExecute = (skillIds, vacancies) => (tasks) => {
  const ids =
    skillIds == null ? store.getState().currentUser.skills.map((skill) => skill.id) : skillIds;
  return tasks.filter(
    (task) =>
      vacancies.filter(
        (vacancy) =>
          vacancy.taskId === task.id &&
          vacancy.status === VACANCY_STATUS.OPEN &&
          ids.includes(vacancy.skillId)
      ).length > 0
  );
};

export const createVacancyFilterOptions = (vacancies, skills) => {
  return [
    {
      id: 'any_vacancies',
      label: 'any skills',
      execute: null,
    },
    {
      id: 'my_skills',
      label: 'my skills',
      execute: createExecute(null, vacancies),
    },
    ...skills.map((skill) => ({
      id: skill.id,
      label: skill.title,
      execute: createExecute([skill.id], vacancies),
    })),
  ];
};
