import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import {
  AuthoredLinks,
  UserSkillsLinks,
  AvailabilityLinks,
  SignedUpLinks,
  ActionLinks,
} from '../Link';
import * as logger from '../../util/Logger';
import { useAuth0 } from '../../Auth';
import * as db from '../../db/Db';
import { formatUserName } from '../../util/Users';

const variant = typographyVariant.user;

export const ShowUser = ({ user, isCurrentUser }) => {
  const classes = useStyles()();

  const { isAuthenticated, logout } = useAuth0();

  const resetHints = () => {
    db.upserttUser({ id: user.id, disabledHints: [] })
      .then(() => {
        logger.debug(`Successfully reset user ${user.id} hints`);
      })
      .catch((e) => {
        logger.error(`Error resetting user ${user.id} hints`, e);
      });
  };

  const makeField = (title, value) => (
    <>
      <Typography className={classes.userSectionHeading} variant={variant.heading}>
        {title}
      </Typography>
      <Divider />
      {typeof value === 'string' ? (
        <Typography className={classes.userSectionBody} variant={variant.body}>
          {value}
        </Typography>
      ) : (
        <div className={classes.userSectionBody}>{value}</div>
      )}
    </>
  );

  const makeActionsPanel = () => (
    <div className={classes.userActionsPanel}>
      {isCurrentUser ? (
        <>
          <Button
            disabled={user.disabledHints == null || user.disabledHints.length === 0}
            className={classes.userActionButton}
            onClick={resetHints}
          >
            Reset Hints
          </Button>
          {isAuthenticated && (
            <Button className={classes.userActionButton} onClick={() => logout()}>
              LOGOUT
            </Button>
          )}
        </>
      ) : (
        <Button
          classes={{ root: classes.interestButton }}
          color="primary"
          onClick={() => {
            window.open(`mailto:${user.emailAddress}`, '_blank');
          }}
        >
          EMAIL {user.firstNames[0]}
        </Button>
      )}
    </div>
  );

  return user == null ? null : (
    <>
      {makeActionsPanel()}

      <div className={classes.userHeading}>
        <Typography variant={variant.name}>
          <b>{formatUserName(user)}</b>
        </Typography>
      </div>

      <div data-more-padding={true} className={classes.idPanel}>
        <Typography variant="body1">ID: {user.id}</Typography>
      </div>

      <div className={classes.userContent}>
        {makeField('Bio', user.bio)}
        {makeField('Full Name', [...user.firstNames, user.lastName].join(' '))}
        {makeField('Email Address', user.emailAddress)}
        {makeField('Skill Groups', <UserSkillsLinks user={user} variant={variant.body} />)}
        {makeField('Available', <AvailabilityLinks user={user} variant={variant.body} />)}
        {makeField('Authored', <AuthoredLinks user={user} variant={variant.body} />)}
        {makeField('Signed Up', <SignedUpLinks user={user} variant={variant.body} />)}
        {makeField('Actions', <ActionLinks user={user} variant={variant.body} />)}
      </div>
    </>
  );
};
