import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {
  setSearchTerm,
  clearTaskFilters,
  setFilterBarVisible,
  setTaskFilter
} from '../../actions/Tasks';
import { LinksList, RLink } from './LinksList';
import * as URLS from '../../constants/Urls';
import * as VACS from '../../constants/Vacancies';

const vacancyDate = date => {
  if (
    typeof date.to === 'undefined' ||
    date.to === null ||
    date.to.length === 0 ||
    date.to === 'TBD'
  ) {
    return `from ${date.from} (end date TBD)`;
  }
  if (
    typeof date.from === 'undefined' ||
    date.from === null ||
    date.from.length === 0 ||
    date.from === 'TBD'
  ) {
    return `until ${date.to} (start date TBD)`;
  }
  return `from ${date.from} to ${date.to}`;
};

const vacancyDates = dates => {
  let output = '';
  for (let i = 0; i < dates.length; i++) {
    output += vacancyDate(dates[i]);
    if (i < dates.length - 1) {
      output += ', then ';
    }
  }
  return output;
};

const handleVacancyClick = (dispatch, vacancyTitle) => {
  dispatch(setSearchTerm(''));
  dispatch(clearTaskFilters());
  dispatch(setFilterBarVisible(true));
  dispatch(setTaskFilter({ type: 'vacancies', value: vacancyTitle }));
};

export const VacancyList = ({ vacancies }) => {
  if (vacancies === null) return null;
  if (
    vacancies.filter(vacancy => VACS.SHORT_STATUS[vacancy.status] !== VACS.STATUS.FILLED).length ===
    0
  )
    return 'All vacancies filled.';
  return (
    <LinksList
      title="Vacancies"
      links={vacancies.map(vacancy => vacancy.title)}
      handleLinkClick={handleVacancyClick}
      url={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
    />
  );
};

export const status = statusField => {
  if (Array.isArray(statusField)) {
    return `Partially filled ${vacancyDates(statusField)}`;
  }
  return VACS.SHORT_STATUS[statusField];
};

export const Vacancy = ({ vacancy }) => (
  <div>
    <Typography variant="body1">
      <RLink
        link={vacancy.title}
        handleLinkClick={handleVacancyClick}
        url={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
      />
      {`${VACS.SHORT_ROLE[vacancy.role]} (${VACS.SHORT_NECESSITY[vacancy.necessity]})`}
    </Typography>
    <div>
      <Typography variant="body1">
        {vacancy.date === VACS.ANY_DATE.short
          ? VACS.ANY_DATE.displayName
          : `Needed ${vacancyDates(vacancy.date)}`}
      </Typography>
    </div>
    <div>
      <Typography variant="body1">{status(vacancy.status)}</Typography>
      {VACS.SHORT_STATUS[vacancy.status] !== VACS.STATUS.FILLED ? (
        <div>
          <Link value={vacancy.title} href="#">
            <b>REGISTER INTEREST</b>
          </Link>
        </div>
      ) : null}
    </div>
  </div>
);

export const VacancyBlock = ({ vacancies }) =>
  vacancies == null
    ? null
    : vacancies.map((vacancy, index) => (
        <div key={index}>
          <br />
          <Vacancy vacancy={vacancy} />
        </div>
      ));
