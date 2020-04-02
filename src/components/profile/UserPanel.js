import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { styles } from '../../styles/Styles';
import { SkillList, VacancyDates } from '../fragments/Vacancies';

const useStyles = makeStyles((theme) => styles(theme));

export const UserPanel = ({ user }) => {
  const classes = useStyles();

  const TaskList = ({ field, title }) =>
    user[field].length === 0 ? null : (
      <>
        <br />
        <div>
          <Typography variant="h6">{title}</Typography>
          {user[field].map((element, index) => (
            <Typography key={index} variant="body1">
              <RouterLink to={`/task/${element.id}`}>{element.title}</RouterLink>
              {Array.isArray(element.periods) ? (
                <>
                  {` `}
                  <VacancyDates dates={element.periods} noUser={true} />
                </>
              ) : null}
            </Typography>
          ))}
        </div>
      </>
    );

  return (
    <div className={classes.fullWidthContent}>
      <div>
        <Typography variant="h4">
          {user.name}
          <Typography variant="caption"> (User ID: {user.id})</Typography>
        </Typography>
      </div>
      <br />
      <div>
        <Typography variant="h6">Bio</Typography>
        <Typography variant="body1">{user.bio}</Typography>
      </div>
      {user.skills === null ? null : (
        <>
          <br />
          <div>
            <Typography variant="h6">Skills</Typography>
            <SkillList variant="body1" skills={user.skills} />
          </div>
        </>
      )}
      {user.available === null ? null : (
        <>
          <br />
          <div>
            <Typography variant="h6">Available Dates</Typography>
            {user.available.map((available, index) => (
              <Typography key={index} variant="body1">
                {available.from} to {available.to}
              </Typography>
            ))}
          </div>
        </>
      )}
      <TaskList field="authored" title="Created" />
      <TaskList field="signedUp" title="Signed Up For" />
    </div>
  );
};
