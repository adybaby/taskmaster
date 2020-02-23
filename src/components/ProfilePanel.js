import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import styles from '../styles/Styles';
import { SkillList } from './lists/Vacancies';

const useStyles = makeStyles(theme => styles(theme));

const ProfilePanel = () => {
  const classes = useStyles();
  const { id } = useParams();
  const currentUser = useSelector(state => state.currentUser);
  const [user, setUser] = useState(currentUser);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof id !== 'undefined' && id !== null) {
      setUser(users.filter(usr => usr.id === id)[0]);
    }
  }, [dispatch, id, users]);

  return (
    <div className={classes.taskPanel}>
      <div>
        <Typography variant="h4">
          {user.name}
          <Typography variant="caption"> (User ID: {user.id})</Typography>
        </Typography>
      </div>
      {user.skills === null ? null : (
        <>
          <br />
          <div>
            <Typography variant="h6">Skills</Typography>
            <SkillList skills={user.skills} />
          </div>
        </>
      )}
      {user.available === null ? null : (
        <>
          <br />
          <div>
            <Typography variant="h6">Available Dates</Typography>
            {user.available.map((available, index) => (
              <div key={index}>
                <Typography variant="body1">
                  {available.from} to {available.to}
                </Typography>
                <br />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePanel;
