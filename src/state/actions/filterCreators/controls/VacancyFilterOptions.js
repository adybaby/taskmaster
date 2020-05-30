const createExecute = (skillIds, vacancies) => (tasks) => {
  return tasks.filter(
    (task) =>
      vacancies.filter(
        (vacancy) =>
          vacancy.taskId === task.id &&
          vacancy.status === 'Open' &&
          skillIds.includes(vacancy.skillId)
      ).length > 0
  );
};

export const createVacancyFilterOptions = (currentUser, vacancies, skills) => {
  return [
    {
      id: 'any_vacancies',
      label: 'any skills',
      execute: null,
    },
    {
      id: 'my_skills',
      label: 'my skills',
      execute: createExecute(
        currentUser.skills.map((skill) => skill.id),
        vacancies
      ),
    },
    ...skills.map((skill) => ({
      id: skill.id,
      label: skill.title,
      execute: createExecute([skill.id], vacancies),
    })),
  ];
};
