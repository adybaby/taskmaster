import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { AuthoredLinks, UserSkillsLinks, AvailabilityLinks, SignedUpLinks } from '../Link';
import { updateUser } from '../../state/actions/UserActions';
import * as logger from '../../util/Logger';
import { useAuth0 } from '../../Auth';

const variant = typographyVariant.user;

export const UserPanel = ({ user }) => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth0();
  const [resetHintsEnabled, setResetHintsEnabled] = useState(false);

  useEffect(() => {
    setResetHintsEnabled(user.disabledHints != null && user.disabledHints.length > 0);
  }, [user, setResetHintsEnabled]);

  const resetHints = () => {
    dispatch(
      updateUser(
        { id: user.id, disabledHints: [] },
        () => {
          logger.debug(`Successfully reset user ${user.id} hints`);
          setResetHintsEnabled(false);
        },
        (e) => {
          logger.error(`Error resetting user ${user.id} hints`, e);
        }
      )
    );
  };

  return (
    <>
      <div className={classes.userHeading}>
        <Typography variant={variant.name}>
          <b>{user.formattedName}</b>
        </Typography>
      </div>
      <div className={classes.userActionsPanel}>
        <Button
          disabled={!resetHintsEnabled}
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
      </div>
      <div className={classes.userContent}>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Full Name
        </Typography>
        <Divider />
        <Typography className={classes.userSectionBody} variant={variant.body}>
          {user.formattedFullName}
        </Typography>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Bio
        </Typography>
        <Divider />
        <Typography className={classes.userSectionBody} variant={variant.body}>
          {user.bio}
        </Typography>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Skill Groups
        </Typography>
        <Divider />
        <div className={classes.userSectionBody}>
          <UserSkillsLinks user={user} variant={variant.body} />
        </div>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Available
        </Typography>
        <Divider />
        <div className={classes.userSectionBody}>
          <AvailabilityLinks user={user} variant={variant.body} />
        </div>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Authored
        </Typography>
        <Divider />
        <div className={classes.userSectionBody}>
          <AuthoredLinks user={user} variant={variant.body} />
        </div>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Signed Up
        </Typography>
        <Divider />
        <div className={classes.userSectionBody}>
          <SignedUpLinks user={user} variant={variant.body} />
        </div>
      </div>
    </>
  );
};
