import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const ListOfLinks = ({ title, links, handleLinkClick, url }) => {
  if (typeof links !== 'undefined' && links !== null && links.length > 0) {
    return (
      <div>
        <Typography variant="caption">
          {typeof title !== 'undefined' ? `${title}: ` : null}

          {links.map(link => (
            <Link
              style={{ marginRight: 5, textDecoration: 'underline' }}
              key={link}
              value={link}
              component={RouterLink}
              to={url}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </Link>
          ))}
        </Typography>
      </div>
    );
  }
  return null;
};

export default ListOfLinks;
