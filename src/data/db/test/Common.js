/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import { cleanString, parseListFromString } from '../../../util/StringUtils';
import { parseDate } from '../../../util/Dates';
import { FIELDS as VACANCY_FIELDS } from '../../fields/Vacancies';

export const isDate = (date) =>
  date instanceof Date && typeof date.getDate !== 'undefined' && date.getTime() !== 0;

export const parseDateList = (fieldStrings, startIndex, targetObj, targetField, hasUserId) => {
  let index = startIndex;
  targetObj[targetField] = [];

  for (index; index < fieldStrings.length; index++) {
    const period = {};

    if (hasUserId) {
      period.userId = cleanString(fieldStrings[index]);
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
      fieldStrings.forEach((str) => {
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

export const buildVacanciesField = (fieldSrc) => {
  const cleanedString = cleanString(fieldSrc);
  if (
    typeof cleanedString === 'undefined' ||
    cleanedString === null ||
    cleanedString.length === 0
  ) {
    return null;
  }

  const vacancies = [];
  const vacancyStrings = parseListFromString(fieldSrc);

  vacancyStrings.forEach((vacancyString) => {
    const vacancy = {};
    const vacancyFieldStrings = cleanString(vacancyString).split(' ');

    vacancy.title = cleanString(vacancyFieldStrings[0]);
    vacancy.role = cleanString(vacancyFieldStrings[1]);

    let index = 2;

    const dateString = cleanString(vacancyFieldStrings[index]);
    if (dateString === VACANCY_FIELDS.AVAILABILITY.ANY_DATE.key) {
      vacancy.date = dateString;
    } else {
      index = parseDateList(vacancyFieldStrings, index, vacancy, 'date', false);
    }

    index++;

    vacancy.necessity = vacancyFieldStrings[index];

    index++;

    const status = vacancyFieldStrings[index];
    if (status === VACANCY_FIELDS.STATUS.FILLED.key) {
      vacancy.status = status;
      index++;
      vacancy.userId = cleanString(vacancyFieldStrings[index]);
    } else if (status === VACANCY_FIELDS.STATUS.VACANT.key) {
      vacancy.status = status;
    } else {
      parseDateList(vacancyFieldStrings, index, vacancy, 'status', true);
    }

    vacancies.push(vacancy);
  });

  return vacancies;
};
