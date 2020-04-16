import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {
  setTaskListFilterControl,
  resetAllTaskListFilterControls,
} from '../../redux/actions/TaskListFilterActions';
import { DispatchingRouterLink as RLink } from './DispatchingRouterLink';
import { DispatchingLinksList as LinksList } from './DispatchingLinksList';
import * as URLS from '../../Urls';
import { FIELDS, decodeField } from '../../data/fields/Vacancies';
import { CreatedByLink } from './CreatedByLink';
import { TASK_FILTER_CONTROL_IDS } from '../../data/filters/TaskListFilterControls';

const handleVacancyClick = (dispatch, vacancyTitle) => {
  dispatch(resetAllTaskListFilterControls());
  dispatch(
    setTaskListFilterControl({ id: TASK_FILTER_CONTROL_IDS.VACANCIES, selectedId: vacancyTitle })
  );
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
      {decodeField(FIELDS.STATUS, vacancy.status).label}
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
    {`${decodeField(FIELDS.ROLE, vacancy.role).label} (${
      decodeField(FIELDS.NECESSITY, vacancy.necessity).label
    })`}
    <br />
    {vacancy.date === FIELDS.AVAILABILITY.ANY_DATE.key ? (
      FIELDS.AVAILABILITY.ANY_DATE.label
    ) : (
      <>
        {`Needed `}
        <VacancyDates dates={vacancy.date} />
      </>
    )}
    <br />
    <Status vacancy={vacancy} />
    <br />
    {vacancy.status !== FIELDS.STATUS.FILLED.key ? (
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
  if (vacancies.filter((vacancy) => vacancy.status !== FIELDS.STATUS.FILLED.key).length === 0)
    return 'All vacancies filled.';
  return (
    <LinksList
      title="Vacancies"
      links={vacancies.map((vacancy) => vacancy.title)}
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
