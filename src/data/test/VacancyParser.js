/* eslint-disable no-param-reassign */
import { cleanString, parseListFromString } from '../../util/StringUtils';
import { parseDate } from '../../util/DateFormatting';
import * as VACS from '../../constants/Vacancies';

const getUserName = (users, id) => {
  return users.filter(user => user.id === id)[0].name;
};

export const parseDateList = (
  fieldStrings,
  startIndex,
  targetObj,
  targetField,
  hasUserId,
  users
) => {
  let index = startIndex;
  targetObj[targetField] = [];

  for (index; index < fieldStrings.length; index++) {
    const period = {};

    if (hasUserId) {
      period.userName = getUserName(users, cleanString(fieldStrings[index]));
      index += 1;
    }
    let nextDateStr = parseDate(fieldStrings[index]);

    if (nextDateStr === null) {
      if (index === startIndex) {
        throw new Error(
          `Expected from date for ${fieldStrings[0]}(${targetField}),instead got ${fieldStrings[index]}`
        );
      }
      return index - 1;
    }
    period.from = nextDateStr;
    if (index === fieldStrings.length) {
      return index - 1;
    }
    nextDateStr = parseDate(fieldStrings[index + 1]);
    if (nextDateStr === null) {
      let outputStr = '';
      fieldStrings.forEach(str => {
        outputStr += `${str} `;
      });
      throw new Error(`Expected to date,instead got ${fieldStrings[index + 1]} (${outputStr})`);
    }
    period.to = nextDateStr;
    targetObj[targetField].push(period);
    index++;
  }
  return index - 1;
};

export const buildVacanciesField = (string, users) => {
  const cleanedString = cleanString(string);
  if (
    typeof cleanedString === 'undefined' ||
    cleanedString === null ||
    cleanedString.length === 0
  ) {
    return null;
  }

  const vacancies = [];
  const vacancyStrings = parseListFromString(string);

  vacancyStrings.forEach(vacancyString => {
    const vacancy = {};
    const vacancyFieldStrings = cleanString(vacancyString).split(' ');

    vacancy.title = cleanString(vacancyFieldStrings[0]);
    vacancy.role = cleanString(vacancyFieldStrings[1]);

    let index = 2;

    const dateString = cleanString(vacancyFieldStrings[index]);
    if (dateString === VACS.ANY_DATE.short) {
      vacancy.date = dateString;
    } else {
      index = parseDateList(vacancyFieldStrings, index, vacancy, 'date', false);
    }

    index++;

    vacancy.necessity = vacancyFieldStrings[index];

    index++;

    const status = vacancyFieldStrings[index];
    if (VACS.SHORT_STATUS[status] === VACS.STATUS.FILLED) {
      vacancy.status = status;
      index++;
      vacancy.userName = getUserName(users, cleanString(vacancyFieldStrings[index]));
    } else if (VACS.SHORT_STATUS[status] === VACS.STATUS.VACANT) {
      vacancy.status = status;
    } else {
      parseDateList(vacancyFieldStrings, index, vacancy, 'status', true, users);
    }

    vacancies.push(vacancy);
  });

  return vacancies;
};
