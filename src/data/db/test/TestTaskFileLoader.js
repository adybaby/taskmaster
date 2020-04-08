/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { readTextFile } from '../../../util/TextFileUtils';
import { cleanString, parseListFromString } from '../../../util/StringUtils';
import * as TYPES from '../../fields/Type';
import { multiplierForLevel } from '../../fields/ContributesTo';
import { buildVacanciesField, isDate } from './Common';

const { EOL } = require('os');

const FILE = '/tasks.txt';
const FIELD_DELIM = '\t';
const CONTRIBUTION_TYPE = {
  [TYPES.DRIVER]: TYPES.ENABLER,
  [TYPES.ENABLER]: TYPES.INITIATIVE,
};

let tasks = null;

const dateRange = {
  tasks: { first: null, last: null },
  users: { first: null, last: null },
  all: { first: null, last: null },
};

const updateDateRange = (firstStr, lastStr) => {
  const firstDate = new Date(firstStr);
  const lastDate = new Date(lastStr);

  if (
    isDate(firstDate) &&
    (dateRange.tasks.first === null || firstDate.getTime() < dateRange.tasks.first)
  ) {
    dateRange.tasks.first = firstDate.getTime();
    dateRange.all.first = firstDate.getTime();
  }
  if (
    isDate(lastDate) &&
    (dateRange.tasks.last === null || lastDate.getTime() > dateRange.tasks.last)
  ) {
    dateRange.tasks.last = lastDate.getTime();
    dateRange.all.last = lastDate.getTime();
  }
};

const buildPriorityFields = () => {
  let highestPriority = 0;
  let highestDriverPriority = 0;

  tasks
    .filter((task) => task.type === TYPES.DRIVER)
    .forEach((driver) => {
      highestDriverPriority =
        driver.priority > highestDriverPriority ? driver.priority : highestDriverPriority;
    });

  tasks
    .filter((task) => task.type === TYPES.ENABLER)
    .forEach((enabler) => {
      enabler.priority = 0;
      enabler.contributesTo.forEach((contribution) => {
        const driverPriority = tasks.filter((task) => task.id === contribution.id)[0].priority;
        enabler.priority +=
          (highestDriverPriority + 1 - driverPriority) * multiplierForLevel(contribution.level);
      });
      highestPriority = enabler.priority > highestPriority ? enabler.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type === TYPES.INITIATIVE)
    .forEach((initiative) => {
      initiative.priority = 0;
      initiative.contributesTo.forEach((contribution) => {
        const enablerPriority = tasks.filter((task) => task.id === contribution.id)[0].priority;
        initiative.priority += enablerPriority * multiplierForLevel(contribution.level);
      });
      highestPriority =
        initiative.priority > highestPriority ? initiative.priority : highestPriority;
    });

  tasks
    .filter((task) => task.type !== TYPES.DRIVER)
    .forEach((task) => {
      task.priority = highestPriority + 1 - task.priority;
    });
};

// returns list of {id, title, type, level} referring to tasks that this task contributes to
const buildContributesToField = (string) => {
  const contributionStrings = parseListFromString(string);
  if (contributionStrings !== null) {
    const contributions = [];
    contributionStrings.forEach((contributionString) => {
      const contributionFields = cleanString(contributionString).split(' ');
      const contribution = { id: contributionFields[0], level: contributionFields[1] };
      const contributee = tasks.filter((task) => task.id === contribution.id)[0];
      contribution.title = contributee.title;
      contribution.type = contributee.type;
      contributions.push(contribution);
    });
    return contributions;
  }
  return null;
};

// returns list of {id, title, type, level} referring to tasks that contribute to this task
const buildContributions = (id, type) => {
  const contributions = [];
  tasks
    .filter((record) => record.type === CONTRIBUTION_TYPE[type])
    .forEach((contributor) => {
      contributor.contributesTo.forEach((contributee) => {
        if (contributee.id === id) {
          contributions.push({
            id: contributor.id,
            title: contributor.title,
            type: contributor.type,
            level: contributee.level,
          });
        }
      });
    });
  return contributions;
};

const buildContributionsFields = () => {
  tasks.forEach((task) => {
    task.contributions = buildContributions(task.id, task.type);
    for (let i = 0; i < task.contributions.length; i++) {
      task.contributions[i].contributions = buildContributions(
        task.contributions[i].id,
        task.contributions[i].type
      );
    }
  });
};

const readRecordsFromText = (text) => {
  const records = [];
  const lines = text.split(EOL);

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      const record = {};
      const fields = lines[i].split(FIELD_DELIM);
      record.id = cleanString(fields[0]);
      record.title = cleanString(fields[1]);
      record.type = cleanString(fields[2]);
      record.createdBy = cleanString(fields[3]);
      record.createdDate = cleanString(fields[4]);
      record.modifiedDate = cleanString(fields[5]);
      record.shortDescription = cleanString(fields[6]);
      record.moreInformation = cleanString(fields[7]);
      record.relatedLinks = parseListFromString(fields[8]);
      record.tags = parseListFromString(fields[9]);
      const priorityString = cleanString(fields[10]);
      record.priority = record.type === TYPES.DRIVER ? priorityString * 1 : priorityString;
      record.cost = cleanString(fields[11]);
      record.hypotheses = cleanString(fields[12]);
      record.successfulIf = cleanString(fields[13]);
      record.approach = cleanString(fields[14]);
      record.contributesTo = cleanString(fields[15]);
      record.startDate = cleanString(fields[16]);
      record.endDate = cleanString(fields[17]);
      updateDateRange(record.startDate, record.endDate);
      try {
        record.vacancies = buildVacanciesField(fields[18]);
      } catch (err) {
        console.error(`Errors when parsing vacancies in item ID ${record.id}`);
        console.error(err);
      }

      records.push(record);
    }
  }

  return records;
};

const buildDerivedFields = () => {
  try {
    tasks.forEach((task) => {
      task.contributesTo = buildContributesToField(task.contributesTo);
    });
    buildContributionsFields();
    buildPriorityFields();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const loadTasksFromFile = () =>
  new Promise((resolve, reject) => {
    readTextFile(FILE)
      .then((text) => {
        tasks = readRecordsFromText(text);
        buildDerivedFields();
        resolve(tasks);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const retrieveTasks = () =>
  new Promise((resolve, reject) => {
    loadTasksFromFile()
      .then(() => {
        resolve({ tasks, dateRange });
      })
      .catch((e) => {
        reject(e);
      });
  });
