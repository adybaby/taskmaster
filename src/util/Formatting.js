import React from 'react';
import Link from '@material-ui/core/Link';

export const LinkItem = ({ link, handler }) => (
  <Link
    style={{ marginRight: 5, textDecoration: 'underline' }}
    key={link}
    value={link}
    href="#"
    onClick={handler(link)}
  >
    {link}
  </Link>
);

export const listOfLinks = (links, handler) => {
  if (typeof links === 'undefined' || links.length < 1) return links;
  return links.map(link => {
    link.trim();
    return <LinkItem key={link} searchTerm={link} handler={handler} />;
  });
};
