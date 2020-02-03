/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import readTextFile from '../../util/TextFileUtils';
import cleanString from '../../util/StringUtils';
import * as TYPES from '../../constants/TaskTypes';

const endLine = require('os').EOL;

const LIST_DELIM = ',';
const FIELD_DELIM = '\t';

let data = null;

const escapeRegExp = (
  str // or better use 'escape-string-regexp' package
) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

const doesTaskMatchStr = str => {
  // eslint-disable-next-line no-undef
  const re = new RegExp(escapeRegExp(str), 'i');
  return srch => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in srch) {
      // eslint-disable-next-line no-prototype-builtins
      if (!srch.hasOwnProperty(prop)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (re.test(srch[prop])) {
        return true;
      }
    }
    return false;
  };
};

const asList = str => {
  const cleanedStr = cleanString(str);
  if (cleanedStr !== null) {
    return cleanedStr.split(LIST_DELIM);
  }
  return null;
};

const makePriorityField = field => {
  const cleanedField = cleanString(field);
  if (isNaN(cleanedField)) {
    return null;
  }
  return cleanedField;
};

const makePrioritiesList = (field, titles) => {
  const prioritiesAsString = asList(field);
  if (prioritiesAsString !== null) {
    const prioritiesList = [];
    prioritiesAsString.forEach(priorityStr => {
      const priorityParts = cleanString(priorityStr).split(' ');
      const id = priorityParts[0];
      const priority = priorityParts[1];
      const title = titles.filter(titleEntry => titleEntry.id === id)[0].title;
      prioritiesList.push({ id, title, priority });
    });
    return prioritiesList;
  }
  return null;
};

const getIdAndTitleFromLine = line => {
  const record = {};
  try {
    const fields = line.split(FIELD_DELIM);
    record.id = cleanString(fields[0]);
    record.title = cleanString(fields[1]);
  } catch (err) {
    console.error(`${line}\n${err}`);
  }
  return record;
};

const getFieldFromLine = (line, titles) => {
  const record = {};
  try {
    const fields = line.split(FIELD_DELIM);
    record.id = cleanString(fields[0]);
    record.title = cleanString(fields[1]);
    record.type = cleanString(fields[2]);
    record.createdBy = cleanString(fields[3]);
    record.createdDate = cleanString(fields[4]);
    record.modifiedDate = cleanString(fields[5]);
    record.shortDescription = cleanString(fields[6]);
    record.moreInformation = cleanString(fields[7]);
    record.relatedLinks = asList(fields[8]);
    record.tags = asList(fields[9]);
    record.priority = makePriorityField(fields[10]);
    record.enables = makePrioritiesList(fields[11], titles);
    record.hypotheses = cleanString(fields[12]);
    record.successfulIf = cleanString(fields[13]);
    record.approach = cleanString(fields[14]);
    record.contributesTo = makePrioritiesList(fields[15], titles);
    record.startDate = cleanString(fields[16]);
    record.endDate = cleanString(fields[17]);
    record.vacancies = asList(fields[18]);
  } catch (err) {
    console.error(`${line}\n${err}`);
  }
  return record;
};

const makeRecordsFromText = text => {
  // build text
  const titles = [];
  const records = [];
  const lines = text.split(endLine);

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      titles.push(getIdAndTitleFromLine(lines[i]));
    }
  }

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      records.push(getFieldFromLine(lines[i], titles));
    }
  }

  return records;
};

export const loadRecordsFromFile = () =>
  new Promise((resolve, reject) => {
    readTextFile('/test_data.txt')
      .then(text => {
        data = makeRecordsFromText(text);
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });

const findAllTasksContainingString = str => {
  if (typeof str === 'undefined' || str === null || str.length < 1) {
    return data;
  }
  return data.filter(doesTaskMatchStr(str));
};

export const getTasks = searchTerm =>
  new Promise((resolve, reject) => {
    if (data === null) {
      loadRecordsFromFile()
        .then(() => {
          resolve(findAllTasksContainingString(searchTerm));
        })
        .catch(e => {
          reject(e);
        });
    } else {
      resolve(findAllTasksContainingString(searchTerm));
    }
  });

export const getTask = id =>
  new Promise((resolve, reject) => {
    if (data === null) {
      loadRecordsFromFile()
        .then(() => {
          resolve(data.filter(element => element.id === id)[0]);
        })
        .catch(e => {
          reject(e);
        });
    } else {
      resolve(data.filter(element => element.id === id)[0]);
    }
  });

const getRelatedPriorities = (task, type, field) => {
  const priorities = [];
  const subset = data.filter(element => element.type === type);
  subset.forEach(element => {
    element[field].forEach(priorityObj => {
      if (priorityObj.id === task.id) {
        priorities.push({ task: element, priority: priorityObj.priority });
      }
    });
  });
  return priorities;
};

export const getEnablersPrioritiesForDriver = driver =>
  new Promise((resolve, reject) => {
    if (data === null) {
      loadRecordsFromFile()
        .then(() => {
          resolve(getRelatedPriorities(driver, TYPES.ENABLER, 'enables'));
        })
        .catch(e => {
          reject(e);
        });
    } else {
      resolve(getRelatedPriorities(driver, TYPES.ENABLER, 'enables'));
    }
  });

export const getInitiativesPrioritiesForEnabler = enabler =>
  new Promise((resolve, reject) => {
    if (data === null) {
      loadRecordsFromFile()
        .then(() => {
          resolve(getRelatedPriorities(enabler, TYPES.INITIATIVE, 'contributesTo'));
        })
        .catch(e => {
          reject(e);
        });
    } else {
      resolve(getRelatedPriorities(enabler, TYPES.INITIATIVE, 'contributesTo'));
    }
  });

export const getUser = () => ({ name: 'aalever' });
