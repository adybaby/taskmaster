import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import { URLS, FILTER_IDS, TABS, ICONS } from '../constants/Constants';
import { formatDate } from '../util/Dates';
import { resetAllFilterParams, setFilterParams } from '../state/actions/FilterParamActions';
import { setFilterBarVisible } from '../state/actions/FilterBarVisibleActions';
import { setCurrentTab } from '../state/actions/CurrentTabActions';

// Link which sets given filter ID with given params opens appropriate view
const TaskFilterParamLink = ({ filterId, param, label, ...typographyProps }) => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const filter = filters[filterId];

  const handleClick = () => {
    dispatch(resetAllFilterParams(filters));
    dispatch(setFilterParams(filterId, [param]));
    if (filter.isOnFilterBar) {
      dispatch(setFilterBarVisible(true));
    }
    dispatch(setCurrentTab(filter.tabs[0] === TABS.initiatives.id ? TABS.initiatives : TABS.all));
  };

  return (
    <Typography {...typographyProps} style={{ display: 'inline-block' }}>
      <Link
        className={classes.link}
        value={param}
        to={`/${URLS.BROWSE}/`}
        onClick={() => handleClick()}
      >
        {label}
      </Link>
    </Typography>
  );
};

// Link which opens given task
export const TaskLink = ({ taskId, taskTitle, inLabelBrackets, taskIcon, ...typographyProps }) => {
  const classes = useStyles()();
  return (
    <Typography {...typographyProps} style={{ display: 'inline-block' }}>
      <Link className={classes.link} to={`/${URLS.TASK}/${taskId}`}>
        {taskIcon != null ? (
          <>
            {taskIcon}
            {`\u00A0`}
            {`\u00A0`}
          </>
        ) : null}
        {`${taskTitle}${inLabelBrackets != null ? ` (${inLabelBrackets})` : ''}`}
      </Link>
    </Typography>
  );
};

// Link which opens given user
export const UserLink = ({ userId, userName, ...typographyProps }) => {
  const classes = useStyles()();

  return (
    <>
      <Typography {...typographyProps} style={{ display: 'inline-block' }}>
        <Link className={classes.link} value={userId} to={`/${URLS.PROFILE}/${userId}`}>
          {userName}
        </Link>
      </Typography>
    </>
  );
};

// convenience method for the inspector which wraps taskfilterparamlink

export const SkillLink = ({ skillId, skillTitle, ...typographyProps }) => (
  <TaskFilterParamLink
    filterId={FILTER_IDS.VACANCIES}
    param={skillId}
    label={skillTitle}
    {...typographyProps}
  />
);

// convenience methods for a specific array field of a user or task
// which groups together lists of the above link elements for each of the elements in that array field
// or returning an "is empty" message if the field is an empty array

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const delimitLinks = (links, delimiter, noLinksMessage, typographyProps) =>
  links.length === 0 ? (
    <Typography key="empty" {...typographyProps} style={{ display: 'inline-block' }}>
      {noLinksMessage}
    </Typography>
  ) : (
    links.reduce((prev, curr) => [prev, delimiter, curr])
  );

export const AuthoredLinks = ({ user, ...typographyProps }) =>
  delimitLinks(
    user.authored.map((task, index) => (
      <TaskLink key={index} taskId={task.id} taskTitle={task.title} {...typographyProps} />
    )),
    <br key="br" />,
    'None',
    typographyProps
  );

export const SignedUpLinks = ({ user, ...typographyProps }) => {
  const classes = useStyles()();
  return delimitLinks(
    user.signedUp.map((signedUp, index) => (
      <div key={index} className={classes.signedUpLink}>
        <TaskLink
          taskId={signedUp.id}
          taskTitle={`${signedUp.title} (${capitalize(signedUp.skillTitle)})`}
          {...typographyProps}
        />
        <br />
        <Typography {...typographyProps}>
          {formatDate(signedUp.startDate)}
          <i>
            {`\u00A0`}to{`\u00A0`}
          </i>
          {formatDate(signedUp.endDate)}
        </Typography>
      </div>
    )),
    <br key="br" />,
    'None declared',
    typographyProps
  );
};

export const ActionLinks = ({ user, ...typographyProps }) => {
  const classes = useStyles()();
  return delimitLinks(
    user.actions.map((action, index) => (
      <div key={index} className={classes.signedUpLink}>
        <TaskLink taskId={action.taskId} taskTitle={action.description} />
      </div>
    )),
    <br key="br" />,
    'None',
    typographyProps
  );
};

export const UserSkillsLinks = ({ user, ...typographyProps }) =>
  delimitLinks(
    user.skills.map((skill, index) => (
      <TaskFilterParamLink
        key={index}
        filterId={FILTER_IDS.VACANCIES}
        param={skill.id}
        label={capitalize(skill.title)}
        {...typographyProps}
      />
    )),
    <br key="br" />,
    'None declared',
    typographyProps
  );

export const AvailabilityLinks = ({ user, ...typographyProps }) =>
  delimitLinks(
    user.available.map((available, index) => (
      <Typography key={index} {...typographyProps}>
        {`${formatDate(available.startDate)} to ${formatDate(available.endDate)}`}
      </Typography>
    )),
    '',
    'None declared',
    typographyProps
  );

export const Editors = ({ task, ...typographyProps }) =>
  task.editorNames.map((editor) => (
    <Fragment key={editor.id}>
      <UserLink {...typographyProps} userId={editor.id} userName={editor.userName} />
      {',\u00A0'}
    </Fragment>
  ));

export const RelatedLinks = ({ task, ...typographyProps }) => {
  const classes = useStyles()();
  return delimitLinks(
    task.relatedLinks.map((relatedLink, index) => (
      <MuiLink key={index} href={relatedLink} className={classes.link} {...typographyProps}>
        {relatedLink}
      </MuiLink>
    )),
    ', ',
    'None',
    typographyProps
  );
};

export const TagLinks = ({ task, ...typographyProps }) =>
  delimitLinks(
    task.tags.map((tag, index) => (
      <TaskFilterParamLink
        key={index}
        filterId={FILTER_IDS.SEARCH_FIELD}
        param={tag}
        label={tag}
        {...typographyProps}
      />
    )),
    ', ',
    'None',
    typographyProps
  );

export const VacancyLinks = ({ task, ...typographyProps }) =>
  delimitLinks(
    task.requiredSkills.map((requiredSkill, index) => (
      <TaskFilterParamLink
        key={index}
        filterId={FILTER_IDS.VACANCIES}
        param={requiredSkill.id}
        label={capitalize(requiredSkill.title)}
        {...typographyProps}
      />
    )),
    ', ',
    'None',
    typographyProps
  );

export const ContributionLinks = ({ task, ...typographyProps }) =>
  delimitLinks(
    task.contributions.map((contribution, index) => (
      <div key={index}>
        <TaskLink
          taskId={contribution.id}
          taskTitle={contribution.title}
          inLabelBrackets={contribution.contribution}
          taskIcon={task.type === 'DRIVER' ? ICONS.ENABLER : ICONS.INITIATIVE}
          {...typographyProps}
        />
      </div>
    )),
    '',
    'None',
    typographyProps
  );

export const ContributesToLinks = ({ task, ...typographyProps }) =>
  delimitLinks(
    task.contributesTo.map((contributesTo, index) => (
      <div key={index}>
        <TaskLink
          key={index}
          taskId={contributesTo.id}
          taskTitle={contributesTo.title}
          inLabelBrackets={contributesTo.contribution}
          taskIcon={task.type === 'ENABLER' ? ICONS.DRIVER : ICONS.ENABLER}
          {...typographyProps}
        />
      </div>
    )),
    '',
    'None',
    typographyProps
  );

export const DriverContributionLinks = ({ task }) => {
  const classes = useStyles()();

  return (
    <div key={task.id}>
      <div className={classes.mapDriverTitle}>
        <TaskLink taskId={task.id} taskTitle={task.title} taskIcon={ICONS.DRIVER} variant="h5" />
      </div>
      <div className={classes.contributionList}>
        {task.contributions.map((contribution, index) => (
          <div key={index}>
            <TaskLink
              taskId={contribution.id}
              taskTitle={contribution.title}
              inLabelBrackets={contribution.contribution}
              taskIcon={ICONS.ENABLER}
              variant="h6"
            />
            <div className={classes.contributionList}>
              {contribution.contributorContributions.map((contributorContribution, innerIndex) => (
                <div key={innerIndex}>
                  <TaskLink
                    taskId={contributorContribution.id}
                    taskTitle={contributorContribution.title}
                    inLabelBrackets={contributorContribution.contribution}
                    taskIcon={ICONS.INITIATIVE}
                    variant="body1"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
