/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import readTextFile from '../../../util/TextFileUtils';
import { cleanString, parseListFromString } from '../../../util/StringUtils';
import { parseDateList, isDate } from './Common';

const { EOL } = require('os');

const FILE = '/users.txt';
const FIELD_DELIM = '\t';
let users = null;
let dateRange = null;

const readRecordsFromText = (text) => {
  const records = [];
  const lines = text.split(EOL);

  const updateDateRange = (available) => {
    available.forEach((period) => {
      const firstDate = new Date(period.from);
      const lastDate = new Date(period.to);
      if (isDate(firstDate) && firstDate.getTime() < dateRange.first) {
        dateRange.first = firstDate.getTime();
      }
      if (isDate(lastDate) && lastDate.getTime() > dateRange.last) {
        dateRange.last = lastDate.getTime();
      }
    });
  };

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      const record = {};
      const fields = lines[i].split(FIELD_DELIM);
      record.id = cleanString(fields[0]);
      record.name = cleanString(fields[1]);
      record.bio = cleanString(fields[2]);
      record.skills = parseListFromString(fields[3]);
      const available = cleanString(fields[4]);
      if (available === null) {
        record.available = [];
      } else {
        parseDateList(available.split(' '), 0, record, 'available');
      }
      updateDateRange(record.available);
      records.push(record);
    }
  }
  return records;
};

const deriveAuthored = (tasks) => {
  users.forEach((user) => {
    user.authored = tasks
      .filter((task) => task.createdBy === user.id)
      .map((task) => ({ id: task.id, title: task.title }));
  });
};

const deriveSignedUp = (tasks) => {
  users.forEach((user) => {
    user.signedUp = [];
    tasks
      .filter((task) => task.vacancies !== null && task.vacancies.length > 0)
      .forEach((task) => {
        for (let vacIndex = 0; vacIndex < task.vacancies.length; vacIndex++) {
          if (task.vacancies[vacIndex].userId === user.id) {
            user.signedUp.push({
              id: task.id,
              title: task.title,
              periods: [{ from: task.startDate, to: task.endDate }],
            });
            break;
          } else if (Array.isArray(task.vacancies[vacIndex].status)) {
            const periods = task.vacancies[vacIndex].status.filter(
              (period) => period.userId === user.id
            );
            if (periods.length > 0) {
              user.signedUp.push({ id: task.id, title: task.title, periods });
            }
          }
        }
      });
  });
};

const loadUsersFromFile = (tasksAndRange) =>
  new Promise((resolve, reject) => {
    readTextFile(FILE)
      .then((text) => {
        ({ dateRange } = tasksAndRange);
        users = readRecordsFromText(text);
        deriveAuthored(tasksAndRange.tasks);
        deriveSignedUp(tasksAndRange.tasks);
        resolve({ users, dateRange });
      })
      .catch((e) => {
        reject(e);
      });
  });

export const retrieveUsers = (tasksAndRange) =>
  new Promise((resolve, reject) => {
    loadUsersFromFile(tasksAndRange)
      .then((usersAndRange) => {
        resolve(usersAndRange);
      })
      .catch((e) => {
        reject(e);
      });
  });
