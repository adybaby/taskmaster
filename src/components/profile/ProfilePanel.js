import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import { UPDATE_STATUS } from '../../constants/Constants';
import { GeneralError } from '../GeneralError';
import { DropDown } from '../DropDown';
import { setCurrentUser } from '../../state/actions/CurrentUserActions';
import { initialise } from '../../state/actions/StateInitialiser';
import config from '../../config.json';

const DEBUG = config.debug;

const variant = typographyVariant.user;

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
}

export const ProfilePanel = () => {
  const classes = useStyles()();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currentUser);
  const [user, setUser] = useState(null);
  const users = useSelector((state) => state.users);
  const userOptions = users.map((u) => ({
    label: formatUserName(u),
    value: u.id,
  }));
  const { isAuthenticated, logout } = useAuth0();
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [id]);

  const onCurrentUserChange = (passedId, userId) => {
    db.getFullUser(userId)
      .then((newCurrentUser) => {
        dispatch(setCurrentUser(newCurrentUser));
        dispatch(initialise());
        if (isMountedRef.current) {
          setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
        }
      })
      .catch((e) => {
        logger.error(e);
        if (isMountedRef.current) {
          setErrorMsg(e);
          setUpdateStatus(UPDATE_STATUS.ERROR);
        }
      });
  };

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      if (id == null) {
        setUser(currentUser);
        setUpdateStatus(UPDATE_STATUS.UPDATED);
      } else {
        db.getFullUser(id)
          .then((retrievedUser) => {
            if (isMountedRef.current) {
              setUser(retrievedUser);
              setUpdateStatus(UPDATE_STATUS.UPDATED);
            }
          })
          .catch((e) => {
            logger.error(e);
            if (isMountedRef.current) {
              setErrorMsg(e);
              setUpdateStatus(UPDATE_STATUS.ERROR);
            }
          });
      }
      dispatch(setCurrentTab(null));
    }
  }, [dispatch, id, isMountedRef, currentUser, updateStatus, user]);

  const resetHints = () => {
    db.upserttUser({ id: user.id, disabledHints: [] })
      .then(() => {
        logger.debug(`Successfully reset user ${user.id} hints`);
      })
      .catch((e) => {
        logger.error(`Error resetting user ${user.id} hints`, e);
      });
  };

  const body = () => (
    <>
      <div className={classes.userHeading}>
        <Typography variant={variant.name}>
          <b>{formatUserName(user)}</b>
        </Typography>
      </div>
      <div data-more-padding={true} className={classes.idPanel}>
        <Typography variant="body1">ID: {user.id}</Typography>
      </div>
      <div className={classes.userActionsPanel}>
        {user.id === currentUser.id ? (
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

      <div className={classes.userContent}>
        {DEBUG ? (
          <div style={{ paddingBottom: 20 }}>
            <DropDown
              id="currentUser"
              prompt="Current User (for testing):"
              value={currentUser.id}
              items={userOptions}
              onChange={onCurrentUserChange}
              twoLines
            />
          </div>
        ) : null}
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Full Name
        </Typography>
        <Divider />
        <Typography className={classes.userSectionBody} variant={variant.body}>
          {[...user.firstNames, user.lastName].join(' ')}
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
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Actions
        </Typography>
        <Divider />
        <div className={classes.userSectionBody}>
          <ActionLinks user={user} variant={variant.body} />
        </div>
      </div>
    </>
  );

  switch (updateStatus) {
    case UPDATE_STATUS.UPDATING:
      return (
        <div className={classes.userHeading}>
          <Typography variant={variant.name}>
            <b>Retrieving user details..</b>
          </Typography>
        </div>
      );
    case UPDATE_STATUS.UPDATED:
      return user != null ? body() : null;
    case UPDATE_STATUS.ERROR:
      return (
        <GeneralError
          errorMsg="There was an error retrieving the user's details from the database."
          errorDetailsMsg={errorMsg}
        />
      );
    default:
      return null;
  }
};
