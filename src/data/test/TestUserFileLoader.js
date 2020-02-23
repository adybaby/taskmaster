/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import readTextFile from '../../util/TextFileUtils';
import { cleanString, parseListFromString } from '../../util/StringUtils';
import { parseDateList } from './VacancyParser';

const { EOL } = require('os');

const FILE = '/users.txt';
const FIELD_DELIM = '\t';
let users = null;

const readRecordsFromText = text => {
  const records = [];
  const lines = text.split(EOL);

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      const record = {};
      const fields = lines[i].split(FIELD_DELIM);
      record.id = cleanString(fields[0]);
      record.name = cleanString(fields[1]);
      record.skills = parseListFromString(fields[2]);
      const available = cleanString(fields[3]);
      if (available === null) {
        record.available = null;
      } else {
        parseDateList(available.split(' '), 0, record, 'available');
      }
      records.push(record);
    }
  }
  return records;
};

const deriveAuthorCount = tasks => {
  users.forEach(user => {
    user.authored = tasks.filter(task => task.createdBy === user.id).length;
  });
};

const loadUsersFromFile = tasks =>
  new Promise((resolve, reject) => {
    readTextFile(FILE)
      .then(text => {
        users = readRecordsFromText(text);
        deriveAuthorCount(tasks);
        resolve(users);
      })
      .catch(e => {
        reject(e);
      });
  });

export const retrieveUsers = tasks =>
  new Promise((resolve, reject) => {
    loadUsersFromFile(tasks)
      .then(() => {
        resolve(users);
      })
      .catch(e => {
        reject(e);
      });
  });
