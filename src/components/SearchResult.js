import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const titleLink = title => (
  <Typography variant="h5">
    <Link href="#">{title}</Link>
  </Typography>
);

const listOfLinks = links =>
  links.map(element => (
    <Link style={{ marginRight: 5, textDecoration: 'underline' }} key={element} href="#">
      {element}
    </Link>
  ));

const SearchResult = result => (
  <div>
    {titleLink(result.title)}
    <Typography>{result.description}</Typography>
    <Typography>Links to: {listOfLinks(result.links)}</Typography>
    <Typography>{listOfLinks(result.tags)}</Typography>
  </div>
);

export default SearchResult;
