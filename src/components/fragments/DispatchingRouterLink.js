import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';

export const DispatchingRouterLink = ({ link, handleLinkClick, url }) => {
  const dispatch = useDispatch();
  return (
    <Link
      style={{ marginRight: 5, textDecoration: 'underline' }}
      value={link}
      component={RouterLink}
      to={url}
      onClick={() => handleLinkClick(dispatch, link)}
    >
      {link}
    </Link>
  );
};
