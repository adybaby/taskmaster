import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';

export const RLink = ({ link, handleLinkClick, url }) => {
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

export const LinksList = ({ title, links, handleLinkClick, url }) => {
  if (typeof links !== 'undefined' && links !== null && links.length > 0) {
    const dedupedLinks = [...new Set(links)];
    return (
      <div>
        <Typography variant="caption">
          {typeof title !== 'undefined' ? `${title}: ` : null}

          {dedupedLinks.map((link, index) => (
            <RLink key={index} url={url} link={link} handleLinkClick={handleLinkClick} />
          ))}
        </Typography>
      </div>
    );
  }
  return null;
};
