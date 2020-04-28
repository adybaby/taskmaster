import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { styles, typographyVariant } from '../../styles/Styles';
import { TASK_TYPE, COST, ICONS } from '../../constants/Constants';
import { ContributionLinks, ContributesToLinks, UserLink } from '../Link';
import { formatDate } from '../../util/Dates';

const useStyles = makeStyles(styles);
const variant = typographyVariant.aag;

export const AtAGlance = ({ task }) => {
  const classes = useStyles();

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
        {task.type === TASK_TYPE.INITIATIVE ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Duration
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {formatDate(task.startDate)} <i>to</i> {formatDate(task.endDate)}
            </Typography>
          </>
        ) : null}
        {task.type === TASK_TYPE.INITIATIVE ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Cost
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {COST.displayNameForCost(task.cost)}
            </Typography>
          </>
        ) : null}
        <Typography variant={variant.title} className={classes.aagTitle}>
          Created By
        </Typography>
        <div className={classes.aagValue}>
          <UserLink variant={variant.value} userId={task.createdBy} />
        </div>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Created On
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {formatDate(task.createdDate)}
        </Typography>
        <Typography variant={variant.title} className={classes.aagTitle}>
          Last Modified On
        </Typography>
        <Typography variant={variant.value} className={classes.aagValue}>
          {formatDate(task.modifiedDate)}
        </Typography>
        {typeof task.contributesTo !== 'undefined' ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Contributes To
            </Typography>
            <div className={classes.aagValue}>
              <ContributesToLinks
                variant={variant.value}
                task={task}
                taskIcon={task.type === TASK_TYPE.ENABLER ? ICONS.DRIVER : ICONS.ENABLER}
              />
            </div>
          </>
        ) : null}
        {typeof task.contributions !== 'undefined' ? (
          <>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Contributions
            </Typography>
            <div className={classes.aagValue}>
              <ContributionLinks
                variant={variant.value}
                task={task}
                taskIcon={task.type === TASK_TYPE.DRIVER ? ICONS.ENABLER : ICONS.INITIATIVE}
              />
            </div>
          </>
        ) : null}
        <Typography variant={variant.title} className={classes.aagTitle}>
          Related Links
        </Typography>
        <div className={classes.aagValue}>
          {task.relatedLinks.length > 0 ? (
            task.relatedLinks.map((relatedLink, index) => (
              <Typography key={index} variant={variant.value} className={classes.aagValue}>
                <Link href={relatedLink} className={classes.link} variant="inherit">
                  {relatedLink}
                </Link>
              </Typography>
            ))
          ) : (
            <Typography variant={variant.value} className={classes.aagValue}>
              <i>None</i>
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
