let neededSkills = null;

export const getNeededSkills = (tasks) => {
  if (tasks === null) return null;
  if (neededSkills !== null) {
    return neededSkills;
  }
  neededSkills = [];
  tasks.forEach((task) => {
    if (task.vacancies != null) {
      task.vacancies.forEach((vacancy) => {
        if (neededSkills.filter((ns) => ns === vacancy.title).length === 0) {
          neededSkills.push(vacancy.title);
        }
      });
    }
  });
  return neededSkills;
};
