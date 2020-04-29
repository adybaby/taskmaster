import { min, max } from 'date-fns';
import { TASK_TYPE } from '../../../../constants/Constants';
import taskFile from './tasks.json';
import userFile from './users.json';
import { prioritise } from './prioritisation/Prioritise';
import { isValidDateString } from '../../../../util/Dates';

const firstLastDates = (tasks, users) => {
  const allDates = [
    ...tasks
      .filter((task) => task.type === TASK_TYPE.INITIATIVE)
      .map((task) => [task.startDate, task.endDate])
      .flat(),
    ...users
      .map((user) => user.available.map((available) => [available.from, available.to]))
      .flat(2),
  ];
  return { first: min(allDates), last: max(allDates) };
};

const enumerateSkills = (tasks, users) => [
  ...new Set(
    tasks
      .filter((task) => task.type === TASK_TYPE.INITIATIVE)
      .map((task) => task.vacancies.map((vacancy) => vacancy.skill))
      .flat(),
    users.map((user) => user.skills).flat()
  ),
];

export const init = () =>
  new Promise((resolve) => {
    // this second parse is a hack to convert string dates to actual dates without having to mess with webpack
    const formattedTasks = JSON.parse(JSON.stringify(taskFile), (key, value) =>
      isValidDateString(value) ? new Date(value) : value
    );

    const formattedUsers = JSON.parse(JSON.stringify(userFile), (key, value) =>
      isValidDateString(value) ? new Date(value) : value
    );

    prioritise(formattedTasks);
    resolve({
      tasks: formattedTasks,
      users: formattedUsers,
      skills: enumerateSkills(formattedTasks, formattedUsers),
      dateRange: firstLastDates(formattedTasks, formattedUsers),
    });
  });
