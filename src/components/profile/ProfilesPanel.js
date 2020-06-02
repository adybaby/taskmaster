import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Divider } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { UserPanel } from './UserPanel';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';

export const ProfilesPanel = () => {
  const classes = useStyles()();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currentUser);
  const [user, setUser] = useState(currentUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [currentTabId, setCurrentTabId] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      if (typeof id !== 'undefined' && id !== null) {
        setUser(users.filter((usr) => usr.id === id)[0]);
      }
      dispatch(setCurrentTab(null));
      setMounted(true);
    }
  }, [dispatch, id, users, mounted]);

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
          {getTab(0, user.firstNames[0])}
          {getTab(1, 'All Users')}
        </Tabs>
      </div>
      {getCurrentPanel()}
    </>
  );
};
