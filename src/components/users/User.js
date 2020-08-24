import React, { useEffect, useState, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useStyles, typographyVariant } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { formatUserName } from '../../util/Users';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import { UPDATE_STATUS } from '../../constants/Constants';
import { GeneralError } from '../GeneralError';
import { DropDown } from '../DropDown';
import { setCurrentUser } from '../../state/actions/CurrentUserActions';
import { initialise } from '../../state/actions/StateInitialiser';
import config from '../../config.json';
import { ShowUser } from './ShowUser';
import { EditUser } from './EditUser';

const DEBUG = config.debug;

const variant = typographyVariant.user;

const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
};

export const User = () => {
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
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();
  const [edit, setEdit] = useState('read');

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [id]);

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

  const onTabChange = (event, value) => {
    setEdit(value);
  };

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

  const makeChangeCurrentUserPanel = () =>
    DEBUG ? (
      <>
        <div
          style={{
            padding: '20px 20px 25px 20px',
            background: '#F2FAFF',
            boxShadow: `inset 0px -20px 15px -23px rgba(87,87,87,1)`,
          }}
        >
          <DropDown
            id="currentUser"
            prompt="Change Current User (Only available in DEBUG mode)"
            value={currentUser.id}
            items={userOptions}
            onChange={onCurrentUserChange}
            twoLines
          />
        </div>
      </>
    ) : null;

  const body = () => (
    <div style={{ marginBottom: edit === 'edit' ? '100px' : 0 }}>
      {makeChangeCurrentUserPanel()}
      {currentUser.id === user.id ? (
        <div className={classes.readEditTabBar}>
          <Tabs value={edit} indicatorColor="primary" onChange={onTabChange}>
            <Tab value={'read'} className={classes.tab} label={<div>READ</div>} />
            <Tab value={'edit'} className={classes.tab} label={<div>EDIT</div>} />
          </Tabs>
        </div>
      ) : null}
      {edit === 'edit' ? (
        <EditUser
          user={user}
          onClose={(updatedUser) => {
            if (updatedUser != null) {
              setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
            }
            setEdit('read');
          }}
        />
      ) : (
        <ShowUser user={user} isCurrentUser={user.id === currentUser.id} />
      )}
    </div>
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
