import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import styles from '../styles/Styles';
import getFilters from '../data/Filters';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const filters = filtersData =>
    filtersData.map(filter => (
      <FormControl key={filter.name} size="small" className={classes.formControl}>
        <InputLabel id={`${filter.name}label`}>{filter.name}</InputLabel>
        <Select
          autoWidth="true"
          defaultValue="0"
          labelId={`${filter.name}select-label`}
          id={`${filter.name}select`}
        >
          {filter.options.map((option, index) => (
            <MenuItem key={index} value={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ));

  return (
    <div className={classes.filterBar}>
      <Toolbar>{filters(getFilters())}</Toolbar>
    </div>
  );
};

export default FilterBar;
