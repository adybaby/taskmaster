import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { SkillsLinks, AuthoredLinks, SignedUpLinks } from '../Link';
import { formatDate } from '../../util/Dates';

const variant = typographyVariant.user;

export const UserPanel = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.userHeading}>
        <Typography variant={variant.name}>
          <b>
            {user.firstName} {user.lastName}
          </b>
        </Typography>
      </div>
      <div className={classes.userContent}>
        <Typography className={classes.userSectionHeading} variant={variant.heading}>
          Bio
        </Typography>
        <Divider />
        <Typography className={classes.userSectionBody} variant={variant.body}>
          {user.bio}
        </Typography>
        {user.skills.length > 0 ? (
          <>
            <Typography className={classes.userSectionHeading} variant={variant.heading}>
              Skills
            </Typography>
            <Divider />
            <div className={classes.userSectionBody}>
              <SkillsLinks user={user} variant={variant.body} />
            </div>
          </>
        ) : null}
        {user.available.length > 0 ? (
          <>
            <Typography className={classes.userSectionHeading} variant={variant.heading}>
              Available
            </Typography>
            <Divider />
            <Typography className={classes.userSectionBody} variant={variant.body}>
              {user.available.map(
                (available) => `${formatDate(available.from)} to ${formatDate(available.to)}`
              )}
            </Typography>
          </>
        ) : null}
        {user.authored.length > 0 ? (
          <>
            <Typography className={classes.userSectionHeading} variant={variant.heading}>
              Authored
            </Typography>
            <Divider />
            <div className={classes.userSectionBody}>
              <AuthoredLinks user={user} variant={variant.body} />
            </div>
          </>
        ) : null}
        {user.signedUp.length > 0 ? (
          <>
            <Typography className={classes.userSectionHeading} variant={variant.heading}>
              Signed Up
            </Typography>
            <Divider />
            <div className={classes.userSectionBody}>
              <SignedUpLinks user={user} variant={variant.body} />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
