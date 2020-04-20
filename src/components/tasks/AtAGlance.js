import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { styles, typographyVariant } from '../../styles/Styles';
import { ContributionLinks, ContributesToLinks, UserLink } from '../Link';
import * as TASK_TYPES from '../../data/fields/Type';
import { displayNameForCost } from '../../data/fields/Cost';
import * as ICONS from '../../Icons';
import { formatDate } from '../../util/Dates';

const useStyles = makeStyles(styles);
const variant = typographyVariant.aag;

export const AtAGlance = ({ task }) => {
  const classes = useStyles();

  return (
    <div className={classes.aagTable}>
      <div className={classes.aagHeader}>
        <Typography variant={variant.title} className={classes.aagTitle}>
          At a Glance
        </Typography>
      </div>
      <div className={classes.aagBody}>
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            Type
          </Typography>
          <Typography variant={variant.value} className={classes.aagValue}>
            {ICONS[task.type]}
            {`\u00A0`}
            {task.type}
          </Typography>
        </div>
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            ID
          </Typography>
          <Typography variant={variant.value} className={classes.aagValue}>
            {task.id}
          </Typography>
        </div>
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            Priority
          </Typography>
          <div className={classes.aagValue}>
            <Typography variant={variant.value}>{task.priority}</Typography>
            <Typography variant={variant.note}>
              (lower number is
              <br /> higher priority)
            </Typography>
          </div>
        </div>
        {task.type === TASK_TYPES.INITIATIVE ? (
          <div className={classes.aagRow}>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Duration
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {formatDate(task.startDate)} <i>to</i> {formatDate(task.endDate)}
            </Typography>
          </div>
        ) : null}
        {task.type === TASK_TYPES.INITIATIVE ? (
          <div className={classes.aagRow}>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Cost
            </Typography>
            <Typography variant={variant.value} className={classes.aagValue}>
              {displayNameForCost(task.cost)}
            </Typography>
          </div>
        ) : null}
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            Created By
          </Typography>
          <div className={classes.aagValue}>
            <UserLink variant={variant.value} userId={task.createdBy} />
          </div>
        </div>
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            Created On
          </Typography>
          <Typography variant={variant.value} className={classes.aagValue}>
            {formatDate(task.createdDate)}
          </Typography>
        </div>
        <div className={classes.aagRow}>
          <Typography variant={variant.title} className={classes.aagTitle}>
            Last Modified On
          </Typography>
          <Typography variant={variant.value} className={classes.aagValue}>
            {formatDate(task.modifiedDate)}
          </Typography>
        </div>
        {typeof task.contributesTo !== 'undefined' ? (
          <div className={classes.aagRow}>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Contributes To
            </Typography>
            <div className={classes.aagValue}>
              <ContributesToLinks
                variant={variant.value}
                task={task}
                taskIcon={task.type === TASK_TYPES.ENABLER ? ICONS.DRIVER : ICONS.ENABLER}
              />
            </div>
          </div>
        ) : null}
        {typeof task.contributions !== 'undefined' ? (
          <div className={classes.aagRow}>
            <Typography variant={variant.title} className={classes.aagTitle}>
              Contributions
            </Typography>
            <div className={classes.aagValue}>
              <ContributionLinks
                variant={variant.value}
                task={task}
                taskIcon={task.type === TASK_TYPES.DRIVER ? ICONS.ENABLER : ICONS.INITIATIVE}
              />
            </div>
          </div>
        ) : null}
        <div className={classes.aagRow}>
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
    </div>
  );
};
