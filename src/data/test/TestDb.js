/* eslint-disable no-param-reassign */
import { retrieveTasks } from './TestTaskFileLoader';
import { retrieveUsers } from './TestUserFileLoader';

let users = null;
let tasks = null;
let skills = null;

const enumerateSkills = () => {
  const skillsSet = new Set();

  tasks.forEach(task => {
    if (task.vacancies != null) {
      task.vacancies.forEach(vacancy => {
        skillsSet.add(vacancy.title);
      });
    }
  });
  users.forEach(user => {
    user.skills.forEach(userSkill => {
      skillsSet.add(userSkill);
    });
  });
  skills = [...skillsSet];
};

export const init = () =>
  new Promise((resolve, reject) => {
    retrieveTasks()
      .then(tasksAndRange => {
        retrieveUsers(tasksAndRange).then(usersAndRange => {
          ({ tasks } = tasksAndRange);
          ({ users } = usersAndRange);
          enumerateSkills();
          resolve({ users, tasks, skills, dateRange: tasksAndRange.dateRange });
        });
      })
      .catch(e => {
        reject(e);
      });
  });
