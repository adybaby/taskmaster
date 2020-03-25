import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';
import styles from '../../styles/Styles';
import { UserPanel } from './UserPanel';

const useStyles = makeStyles(theme => styles(theme));

export const ProfilesPanel = () => {
  const classes = useStyles();
  const { id } = useParams();
  const currentUser = useSelector(state => state.currentUser);
  const [user, setUser] = useState(currentUser);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [currentTabId, setCurrentTabId] = useState(0);

  useEffect(() => {
    if (typeof id !== 'undefined' && id !== null) {
      setUser(users.filter(usr => usr.id === id)[0]);
    }
  }, [dispatch, id, users]);

  const getCurrentPanel = () => {
    switch (currentTabId) {
      case 0:
        return <UserPanel user={user} />;
      case 1:
        return users.map((u, i) => (
          <React.Fragment key={i}>
            <UserPanel user={u} />
            <Divider />
          </React.Fragment>
        ));
      default:
        return <UserPanel user={user} />;
    }
  };

  const handleChange = (event, newValue) => {
    setCurrentTabId(newValue);
  };

  const getTab = (value, label) => (
    <Tab value={value} className={classes.tab} label={<div>{label}</div>} />
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <Tabs value={currentTabId} indicatorColor="primary" onChange={handleChange}>
          {getTab(0, user.name)}
          {getTab(1, 'All Users')}
        </Tabs>
      </div>
      {getCurrentPanel()}
    </>
  );
};
