import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { setTaskFilter } from '../../actions/TaskFilters';
import { DispatchingRouterLink as RLink } from './DispatchingRouterLink';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';
import * as URLS from '../../constants/Urls';
import * as VACS from '../../constants/Vacancies';
import CreatedByLink from '../CreatedByLink';

const handleVacancyClick = (dispatch, vacancyTitle) => {
  dispatch(setTaskFilter({ type: 'searchTerm', value: '' }));
  dispatch(setTaskFilter({ type: 'filterBar', enabled: true }));
  dispatch(setTaskFilter({ type: 'vacancies', value: vacancyTitle }));
};

const User = ({ userId }) =>
  typeof userId !== 'undefined' && userId !== null ? (
    <>
      {` (`}
      <CreatedByLink createdBy={userId} />
      {`)`}
    </>
  ) : null;

const VacancyDate = ({ date, noUser }) => {
  if (
    typeof date.to === 'undefined' ||
    date.to === null ||
    date.to.length === 0 ||
    date.to === 'TBD'
  ) {
    return (
      <>
        {`from ${date.from} (end date TBD)`}
        {noUser ? null : <User userId={date.userId} />}
      </>
    );
  }
  if (
    typeof date.from === 'undefined' ||
    date.from === null ||
    date.from.length === 0 ||
    date.from === 'TBD'
  ) {
    return (
      <>
        {`until ${date.to} (start date TBD)`}
        {noUser ? null : <User userId={date.userId} />}
      </>
    );
  }
  return (
    <>
      {`from ${date.from} to ${date.to}`}
      {noUser ? null : <User userId={date.userId} />}
    </>
  );
};

export const VacancyDates = ({ dates, noUser }) => {
  const output = [];
  for (let i = 0; i < dates.length; i++) {
    output.push(<VacancyDate key={i} date={dates[i]} noUser={noUser} />);
    if (i < dates.length - 1) {
      output.push(<React.Fragment key={`_${i}`}>{', then '}</React.Fragment>);
    }
  }
  return output;
};

export const Status = ({ vacancy }) => {
  if (Array.isArray(vacancy.status)) {
    return (
      <>
        {`Partially filled `}
        <VacancyDates dates={vacancy.status} />
      </>
    );
  }
  return (
    <>
      {VACS.SHORT_STATUS[vacancy.status]}
      <User userId={vacancy.userId} />
    </>
  );
};

export const Vacancy = ({ vacancy }) => (
  <Typography variant="body1">
    <RLink
      link={vacancy.title}
      handleLinkClick={handleVacancyClick}
      url={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
    />
    {`${VACS.SHORT_ROLE[vacancy.role]} (${VACS.SHORT_NECESSITY[vacancy.necessity]})`}
    <br />
    {vacancy.date === VACS.ANY_DATE.short ? (
      VACS.ANY_DATE.displayName
    ) : (
      <>
        {`Needed `}
        <VacancyDates dates={vacancy.date} />
      </>
    )}
    <br />
    <Status vacancy={vacancy} />
    <br />
    {VACS.SHORT_STATUS[vacancy.status] !== VACS.STATUS.FILLED ? (
      <Link value={vacancy.title} href="#">
        <b>REGISTER INTEREST</b>
      </Link>
    ) : null}
  </Typography>
);

export const VacancyBlock = ({ vacancies }) =>
  vacancies == null
    ? null
    : vacancies.map((vacancy, index) => (
        <React.Fragment key={index}>
          <Vacancy vacancy={vacancy} />
          <br />
        </React.Fragment>
      ));

export const VacancyList = ({ vacancies }) => {
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

export const SkillList = ({ skills }) =>
  skills.map((skill, index) => (
    <RLink
      key={index}
      link={skill}
      handleLinkClick={handleVacancyClick}
      url={`/${URLS.BROWSE}/${URLS.INITIATIVES}`}
    />
  ));
