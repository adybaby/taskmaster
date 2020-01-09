import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import getSearchResults from '../data/Items';
import SearchResult from './SearchResult';

const SearchResults = ({ type, searchTerm }) => {
  const results = getSearchResults(type, searchTerm);

  return (
    <List>
      <ListItem key="numResults">
        {' '}
        <Typography variant="subtitle1">{results.length} results</Typography>
      </ListItem>
      {results.map((result, index) => (
        <ListItem key={index}>{SearchResult(result)}</ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
