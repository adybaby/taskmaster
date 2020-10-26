import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import {
  ContributesToLinks,
  ContributionLinks,
  UserLink,
  RelatedLinks,
  TagLinks,
  VacancyLinks,
  Editors,
} from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.aag;

const formatPriority = (task) => {
  const ordinal = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11) {
      return `${i}st`;
    }
    if (j === 2 && k !== 12) {
      return `${i}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${i}rd`;
    }
    return `${i}th`;
  };

  const camel = (s) => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);

  return `${ordinal(task.priority)} ${camel(task.type)} (1st is highest)`;
};

export const ShowAtAGlance = ({ task }) => {
  const classes = useStyles()();

  const makeField = (label, value) => (
    <>
      <Typography variant={variant.title} className={classes.aagTitle}>
        {label}
      </Typography>
      {typeof value === 'string' ? (
        <Typography variant={variant.value} className={classes.aagValue}>
          {value}
        </Typography>
      ) : (
        <div className={classes.aagValue}>{value}</div>
      )}
    </>
  );

  const makeInitiativeFields = () => (
    <>
      {makeField('Duration', `${formatDate(task.startDate)} to ${formatDate(task.endDate)}`)}
      {makeField('Cost', task.cost)}
    </>
  );

  return (
    <div data-edit={false} className={classes.aagPanel}>
      <div className={classes.aagTable}>
        <Typography variant={variant.title} className={classes.aagHeader}>
          At a Glance
        </Typography>
        {makeField(
          'Type',
          <>
            {ICONS[task.type]}
            {`\u00A0`}
            {task.type}
          </>
        )}
        {makeField('ID', task.id)}
        {makeField('Editors', <Editors task={task} variant={variant.value} />)}
        {makeField('Priority', formatPriority(task))}
        {task.type === 'INITIATIVE' ? makeInitiativeFields() : null}
        {makeField('Created On', formatDate(task.createdDate))}
        {makeField(
          'Created By ',
          <UserLink variant={variant.value} userId={task.createdBy} userName={task.createdByName} />
        )}
        {makeField('Last Modified On ', formatDate(task.modifiedDate))}
        {makeField(
          'Last Modified By ',
          <UserLink
            variant={variant.value}
            userId={task.modifiedBy}
            userName={task.modifiedByName}
          />
        )}
        {task.type === 'DRIVER?'
          ? null
          : makeField('Contributes To', <ContributesToLinks task={task} variant={variant.value} />)}
        {task.type === 'INITIATIVE'
          ? null
          : makeField('Contributions', <ContributionLinks task={task} variant={variant.value} />)}
        {makeField('Vacant Skills', <VacancyLinks task={task} variant={variant.value} />)}
        {makeField('Related Links', <RelatedLinks task={task} variant={variant.value} />)}
        {makeField('Tags', <TagLinks task={task} variant={variant.value} />)}
      </div>
    </div>
  );
};
