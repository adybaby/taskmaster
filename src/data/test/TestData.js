/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import readTextFile from '../../util/TextFileUtils';
import { stripQuotes } from '../../util/StringUtils';

const endLine = require('os').EOL;

export const TYPES = {
  DRIVER: 'Driver',
  ENABLER: 'Enabler',
  INITIATIVE: 'Initiative'
};

const addField = (field, id, str, asList) => {
  const trimmed = str.trim();
  if (trimmed.length > 0) {
    if (asList) {
      field[id] = stripQuotes(trimmed).split(',');
    } else {
      field[id] = stripQuotes(trimmed);
    }
  }
};

const processLine = line => {
  const field = {};
  try {
    const fields = line.split('\t');
    addField(field, 'id', fields[0], false);
    addField(field, 'title', fields[1], false);
    addField(field, 'type', fields[2], false);
    addField(field, 'createdBy', fields[3], false);
    addField(field, 'createdDate', fields[4], false);
    addField(field, 'modifiedDate', fields[5], false);
    addField(field, 'shortDescription', fields[6], false);
    addField(field, 'moreInformation', fields[7], false);
    addField(field, 'relatedLinks', fields[8], true);
    addField(field, 'tags', fields[9], true);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(fields[10])) {
      field.priority = null;
    } else {
      field.priority = fields[10];
    }
    addField(field, 'enables', fields[11], true);
    addField(field, 'initiatives', fields[12], true);
    addField(field, 'hypotheses', fields[13], false);
    addField(field, 'successfulIf', fields[14], false);
    addField(field, 'approach', fields[15], false);
    addField(field, 'contributesTo', fields[16], false);
    addField(field, 'startDate', fields[17], false);
    addField(field, 'endDate', fields[18], false);
    addField(field, 'vacancies', fields[19], true);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`${line}\n${err}`);
  }
  return field;
};

const processFileText = text => {
  // build text
  const data = [];
  const lines = text.split(endLine);

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      data.push(processLine(lines[i]));
    }
  }

  return data;
};

export const loadData = () =>
  new Promise((resolve, reject) => {
    readTextFile('./test_data.txt')
      .then(text => {
        resolve(processFileText(text));
      })
      .catch(e => {
        reject(e);
      });
  });

export const getUser = () => ({ name: 'aalever' });

export default loadData;
