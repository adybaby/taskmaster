import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import {
  URLS,
  FILTER_TYPES,
  TASK_LIST_FILTER_CONTROL_IDS,
  CONTRIBUTES_TO,
  ICONS,
} from '../constants/Constants';
import { formatDate } from '../util/Dates';
import {
  resetAllTaskListFilterControls,
  setTaskListFilterControl,
} from '../state/actions/TaskListFilterActions';

const TaskFilterLink = ({
  paramName,
  paramValue,
  filterControlId,
  url,
  label,
  forInitiatives,
  ...typographyProps
}) => {
  const classes = useStyles();

  // Links used to dispatch task filters

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetAllTaskListFilterControls());
    dispatch(setTaskListFilterControl({ id: filterControlId, [paramName]: paramValue }));
  };

  return (
    <Typography style={{ display: 'inline-block' }} {...typographyProps}>
      <Link
        className={classes.link}
        value={paramValue}
        to={forInitiatives ? `/${URLS.BROWSE}/${URLS.INITIATIVES}` : `/`}
        onClick={() => handleClick()}
      >
        {label}
      </Link>
    </Typography>
  );
};

const TaskFilterLinks = ({
  paramName,
  paramValues,
  filterControlId,
  forInitiatives,
  ...typographyProps
}) =>
  typeof paramValues !== 'undefined' && paramValues !== null && paramValues.length > 0 ? (
    <>
      {[...new Set(paramValues)].map((paramValue, index) => (
        <React.Fragment key={index}>
          <TaskFilterLink
            paramName={paramName}
            paramValue={paramValue}
            filterControlId={filterControlId}
            label={paramValue}
            forInitiatives={forInitiatives}
            {...typographyProps}
          />
          {index < paramValues.length - 1 ? ', ' : null}
        </React.Fragment>
      ))}
    </>
  ) : null;

// Links used to display active Task fields

export const TaskLink = ({ task, taskIcon, ...typographyProps }) => {
  const classes = useStyles();
  return (
    <Typography style={{ display: 'inline-block' }} {...typographyProps}>
      <Link className={classes.link} to={`/${URLS.TASK}/${task.id}`}>
        {typeof taskIcon !== 'undefined' ? (
          <>
            {taskIcon}
            {`\u00A0`}
            {`\u00A0`}
          </>
        ) : null}
        {task.title}
      </Link>
    </Typography>
  );
};

export const UserLink = ({ userId, ...typographyProps }) => {
  const user = useSelector((state) => state.users).find((u) => u.id === userId);
  const classes = useStyles();

  return (
    <>
      <Typography style={{ display: 'inline-block' }} {...typographyProps}>
        <Link className={classes.link} value={user.id} to={`/${URLS.PROFILE}/${user.id}`}>
          {user.firstName}
          {`\u00A0`}
          {user.lastName}
        </Link>
      </Typography>
      {user.authored.length > 0 ? (
        <TaskFilterLink
          paramName={FILTER_TYPES.SELECT.paramName}
          paramValue={user.id}
          filterControlId={TASK_LIST_FILTER_CONTROL_IDS.CREATED_BY}
          label={`\u00A0(${user.authored.length})`}
          forInitiatives={false}
          {...typographyProps}
        />
      ) : null}
    </>
  );
};

export const SkillLink = ({ skill, ...typographyProps }) => (
  <TaskFilterLink
    paramName={FILTER_TYPES.SELECT.paramName}
    paramValue={skill}
    filterControlId={TASK_LIST_FILTER_CONTROL_IDS.VACANCIES}
    label={skill}
    forInitiatives={true}
    {...typographyProps}
  />
);

export const VacancyLinks = ({ task, ...typographyProps }) =>
  typeof task.vacancies !== 'undefined' && task.vacancies.length > 0 ? (
    <TaskFilterLinks
      paramName={FILTER_TYPES.SELECT.paramName}
      paramValues={task.vacancies
        .filter((vacancy) => vacancy.status === 'OPEN')
        .map((vacancy) => vacancy.skill)}
      filterControlId={TASK_LIST_FILTER_CONTROL_IDS.VACANCIES}
      forInitiatives={true}
      {...typographyProps}
    />
  ) : null;

export const TagsLinks = ({ task, ...typographyProps }) =>
  typeof task.tags !== 'undefined' && task.tags.length > 0 ? (
    <TaskFilterLinks
      paramName={FILTER_TYPES.TEXT.paramName}
      paramValues={task.tags}
      filterControlId={TASK_LIST_FILTER_CONTROL_IDS.SEARCH_FIELD}
      forInitiatives={false}
      {...typographyProps}
    />
  ) : null;

const ContributeLink = ({ contribute, taskIcon, ...typographyProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.contributeLink}>
      <div>
        <TaskLink task={contribute} taskIcon={taskIcon} {...typographyProps} />
        <br />
        <Typography style={{ display: 'inline-block' }} variant="caption">
          <i>{CONTRIBUTES_TO.displayNameForLevel(contribute.level)}</i>
        </Typography>
      </div>
    </div>
  );
};

const ContributeLinks = ({ task, field, taskIcon, ...typographyProps }) =>
  typeof task[field] !== 'undefined' && task[field].length > 0 ? (
    <div>
      {task[field].map((contribute, index) => (
        <ContributeLink
          key={index}
          taskIcon={taskIcon}
          contribute={contribute}
          {...typographyProps}
        />
      ))}
    </div>
  ) : null;

export const ContributionLinks = ({ task, taskIcon, ...typographyProps }) => (
  <ContributeLinks task={task} field="contributions" taskIcon={taskIcon} {...typographyProps} />
);

export const ContributesToLinks = ({ task, taskIcon, ...typographyProps }) => (
  <ContributeLinks task={task} field="contributesTo" taskIcon={taskIcon} {...typographyProps} />
);

export const DriverContributionLinks = ({ task }) => {
  const classes = useStyles();
  return typeof task.contributions !== 'undefined' && task.contributions.length > 0 ? (
    <div className={classes.contributionList}>
      {task.contributions.map((contribute, index) => (
        <div key={index}>
          <ContributeLink
            key={index}
            taskIcon={ICONS.ENABLER}
            contribute={contribute}
            variant="h6"
          />
          <div className={classes.contributionList}>
            <ContributionLinks task={contribute} taskIcon={ICONS.INITIATIVE} variant="body1" />
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export const SkillsLinks = ({ user, ...typographyProps }) =>
  typeof user.skills !== 'undefined' && user.skills.length > 0 ? (
    <TaskFilterLinks
      paramName={FILTER_TYPES.SELECT.paramName}
      paramValues={user.skills}
      filterControlId={TASK_LIST_FILTER_CONTROL_IDS.VACANCIES}
      forInitiatives={true}
      {...typographyProps}
    />
  ) : null;

export const AuthoredLinks = ({ user, ...typographyProps }) =>
  typeof user.authored !== 'undefined' && user.authored.length > 0
    ? user.authored.map((authored, index) => (
        <div key={index}>
          <TaskLink task={authored} {...typographyProps} />
        </div>
      ))
    : null;

export const SignedUpLinks = ({ user, ...typographyProps }) => {
  const classes = useStyles();
  return typeof user.signedUp !== 'undefined' && user.signedUp.length > 0
    ? user.signedUp.map((signedUp, index) => (
        <div key={index} className={classes.signedUpLink}>
          <div>
            <TaskLink task={signedUp} {...typographyProps} />
            <br />
            {typeof signedUp.periods !== 'undefined' && signedUp.periods.length > 0
              ? signedUp.periods.map((period, i) => (
                  <Typography key={i} variant="caption">
                    {formatDate(period.from)}
                    <i>
                      {`\u00A0`}to{`\u00A0`}
                    </i>
                    {formatDate(period.to)}
                  </Typography>
                ))
              : null}
          </div>
        </div>
      ))
    : null;
};
