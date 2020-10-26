import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useStyles, typographyVariant } from '../../styles/Styles';
import {
  AuthoredLinks,
  UserSkillsLinks,
  AvailabilityLinks,
  SignedUpLinks,
  ActionLinks,
  POCLinks,
} from '../Link';
import * as logger from '../../util/Logger';
import { useAuth0 } from '../../Auth';
import * as db from '../../db/Db';
import { formatUserName } from '../../util/Users';

const variant = typographyVariant.user;

export const ShowUser = ({ user, currentUser, onError }) => {
  const classes = useStyles()();
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated, logout } = useAuth0();

  const resetHints = () => {
    db.upsertUser({ id: user.id, disabledHints: [] })
      .then(() => {
        logger.debug(`Successfully reset user ${user.id} hints`);
        enqueueSnackbar('Hints resetted.', { variant: 'success' });
      })
      .catch((e) => {
        const errMsg = `Error resetting user ${user.id} hints: `;
        logger.error(`Error resetting user ${user.id} hints`, e);
        onError(errMsg + e.message);
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
      <>
        {currentUser.id === user.id || currentUser.permissions.includes('admin') ? (
          <Button
            disabled={user.disabledHints == null || user.disabledHints.length === 0}
            className={classes.userActionButton}
            onClick={resetHints}
          >
            Reset Hints
          </Button>
        ) : null}
        {currentUser.id === user.id && isAuthenticated ? (
          <Button className={classes.userActionButton} onClick={() => logout()}>
            LOGOUT
          </Button>
        ) : null}
        {currentUser.id !== user.id && isAuthenticated ? (
          <Button
            className={classes.userActionButton}
            color="primary"
            onClick={() => {
              window.open(`mailto:${user.emailAddress}`, '_blank');
            }}
          >
            EMAIL {user.firstNames[0]}
          </Button>
        ) : null}
      </>
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
        {makeField(
          'Point of Contact for Task Vacancies',
          <POCLinks user={user} variant={variant.body} />
        )}
        {makeField('Actions', <ActionLinks user={user} variant={variant.body} />)}
      </div>
    </>
  );
};
