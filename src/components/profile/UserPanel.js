import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { AuthoredLinks, UserSkillsLinks, AvailabilityLinks, SignedUpLinks } from '../Link';

const variant = typographyVariant.user;

export const UserPanel = ({ user }) => {
  const classes = useStyles()();

  return (
    <>
      <div className={classes.userHeading}>
        <Typography variant={variant.name}>
          <b>{user.formattedName}</b>
        </Typography>
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
