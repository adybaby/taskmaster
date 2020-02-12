import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { getCurrentUser, findUser } from '../actions/Users';
import * as STATUS from '../constants/FindStatus';
import styles from '../styles/Styles';
import { SkillList } from './lists/Vacancies';

const useStyles = makeStyles(theme => styles(theme));

const ProfilePanel = () => {
  const classes = useStyles();
  const { id } = useParams();
  const user = useSelector(state => state.user);
  const userStatus = useSelector(state => state.userStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof id === 'undefined' || id === null) {
      dispatch(getCurrentUser());
    } else {
      dispatch(findUser(id));
    }
  }, [dispatch, id]);

  switch (userStatus) {
    case STATUS.HAVE_RESULTS:
      return (
        <div className={classes.taskPanel}>
          <div>
            <Typography variant="h4">
              {user.name}
              <Typography variant="caption"> (User ID: {user.id})</Typography>
            </Typography>
          </div>
          <br />
          <div>
            <Typography variant="h6">Skills</Typography>
            <SkillList skills={user.skills} />
          </div>
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
        </div>
      );
    case STATUS.NO_RESULTS:
      return (
        <div className={classes.taskPanel}>
          <Typography variant="h6">User not found</Typography>
        </div>
      );
    default:
      return (
        <div className={classes.taskPanel}>
          <Typography variant="h6">There was an unknown database error</Typography>
        </div>
      );
  }
};

export default ProfilePanel;
