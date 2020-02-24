import React from 'react';
import { DispatchingRouterLink as RLink } from './DispatchingRouterLink';

export const DispatchingLinksList = ({ title, links, handleLinkClick, url }) => {
  if (typeof links !== 'undefined' && links !== null && links.length > 0) {
    const dedupedLinks = [...new Set(links)];
    return (
      <>
        {typeof title !== 'undefined' ? `${title}: ` : null}
        {dedupedLinks.map((link, index) => (
          <RLink key={index} url={url} link={link} handleLinkClick={handleLinkClick} />
        ))}
      </>
    );
  }
  return null;
};
