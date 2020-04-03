import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../../styles/Styles';

const useStyles = makeStyles(styles);

export const DispatchingRouterLink = ({ link, handleLinkClick, url }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Link
      className={classes.link}
      style={{ marginRight: 5, textDecoration: 'underline' }}
      value={link}
      to={url}
      onClick={() => handleLinkClick(dispatch, link)}
    >
      {link}
    </Link>
  );
};
