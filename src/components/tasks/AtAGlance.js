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
} from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.aag;

export const AtAGlance = ({ task }) => {
  const classes = useStyles()();

  return (
    <div className={classes.aagPanel}>
      <div className={classes.aagTable}>
        <Typography variant={variant.title} className={classes.aagHeader}>
          At a Glance
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Type
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {ICONS[task.type]}
          {`\u00A0`}
          {task.type}
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          ID
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {task.id}
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Priority
        </Typography>
        <div className={classes.aagValue}>
          <Typography variant={variant.value}>{task.priority}</Typography>
          <Typography variant={variant.note}>(lower number is higher priority)</Typography>
        </div>
        {task.type === 'INITIATIVE' ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Duration
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {formatDate(task.startDate)} <i>to</i> {formatDate(task.endDate)}
            </Typography>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Cost
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {task.cost}
            </Typography>
          </>
        ) : null}
        <Typography variant={variant.title} className={classes.aagTitle}>
          Created On
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {formatDate(task.createdDate)}
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Created By
        </Typography>
        <div className={classes.aagValue}>
          <UserLink variant={variant.value} userId={task.createdBy} userName={task.createdByName} />
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Last Modified On
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {formatDate(task.modifiedDate)}
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Last Modified By
        </Typography>
        <div className={classes.aagValue}>
          <UserLink
            variant={variant.value}
            userId={task.modifiedBy}
            userName={task.modifiedByName}
          />
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Editors
        </Typography>
        <div className={classes.aagValue}>
          {task.editors.map((editor) => (
            <UserLink
              key={editor.id}
              variant={variant.value}
              userId={editor.id}
              userName={editor.userName}
            />
          ))}
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Contributes To
        </Typography>
        <div className={classes.aagValue}>
          <ContributesToLinks task={task} variant={variant.value} />
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Contributions
        </Typography>
        <div className={classes.aagValue}>
          <ContributionLinks task={task} variant={variant.value} />
        </div>
        {task.type === 'INITIATIVE' ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Vacant Skills
            </Typography>
            <div className={classes.aagValue}>
              <VacancyLinks task={task} variant={variant.value} />
            </div>
          </>
        ) : null}
        <Typography variant={variant.title} className={classes.aagTitle}>
          Related Links
        </Typography>
        <div className={classes.aagValue}>
          <RelatedLinks task={task} variant={variant.value} />
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Tags
        </Typography>
        <div className={classes.aagValue}>
          <TagLinks task={task} variant={variant.value} />
        </div>
      </div>
    </div>
  );
};
