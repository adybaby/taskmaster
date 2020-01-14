import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import styles from '../styles/Styles';
import * as FILTERS from '../constants/TaskFilters';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const Filter = ({ title, options }) => (
    <FormControl key={title} size="small" className={classes.formControl}>
      <InputLabel id={`${title}label`}>{title}</InputLabel>
      <Select
        autoWidth="true"
        defaultValue="0"
        labelId={`${title}select-label`}
        id={`${title}select`}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.filterBar}>
      <Toolbar>
        <Filter name={FILTERS.CREATED} options={FILTERS.CREATED_OPTIONS} />
        <Filter name={FILTERS.VACANCIES} options={FILTERS.VACANCIES_OPTIONS} />
        <Filter name={FILTERS.AUTHOR} options={FILTERS.AUTHOR_OPTIONS} />
      </Toolbar>
    </div>
  );
};

export default FilterBar;
