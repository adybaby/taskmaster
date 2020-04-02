const DEFAULT_FILTER_ID = 'ANY_VACANCIES';

const createExecuteFunction = (skills) => (tasks) =>
  tasks.filter((task) => {
    if (task.vacancies === null) {
      return false;
    }
    for (let taskCounter = 0; taskCounter < task.vacancies.length; taskCounter++) {
      for (let cusCounter = 0; cusCounter < skills.length; cusCounter++) {
        if (task.vacancies[taskCounter].title.includes(skills[cusCounter])) {
          return true;
        }
      }
    }
    return false;
  });

const getSkillVacancies = (tasks) => {
  if (tasks === null) return null;
  const skillVacancies = [];
  tasks.forEach((task) => {
    if (task.vacancies != null) {
      task.vacancies.forEach((vacancy) => {
        if (skillVacancies.filter((vac) => vac === vacancy.title).length === 0) {
          skillVacancies.push(vacancy.title);
        }
      });
    }
  });
  return skillVacancies.sort();
};

export const createVacancyFilters = (tasks, currentUser) => ({
  options: [
    {
      id: DEFAULT_FILTER_ID,
      label: 'any skills',
    },
    {
      id: 'MY_SKILLS',
      label: 'my skills',
      execute: createExecuteFunction(currentUser.skills),
    },
    ...getSkillVacancies(tasks).map((skillVacancy) => ({
      id: skillVacancy,
      label: `a ${skillVacancy}`,
      execute: createExecuteFunction([skillVacancy]),
    })),
  ],
  defaultId: DEFAULT_FILTER_ID,
  selectedId: DEFAULT_FILTER_ID,
});
