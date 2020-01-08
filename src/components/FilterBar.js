/* eslint-disable no-plusplus */
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import styles from '../styles/Styles';

const useStyles = makeStyles(theme => styles(theme));

const App = () => {
  const classes = useStyles();

  const filter = (name, options) => (
    <FormControl size="small" className={classes.formControl}>
      <InputLabel id={`${name}label`}>{name}</InputLabel>
      <Select
        autoWidth="true"
        defaultValue="0"
        labelId={`${name}select-label`}
        id={`${name}select`}
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
        {filter('Creation Date', [
          'Any Time',
          'Today',
          'This Week',
          'This Month',
          'Specify Period..'
        ])}
        {filter('Vacancies', [
          'Relevant Vacancies',
          'UX Designer',
          'Any Developer',
          'Lean Facilitator',
          'HAK Developer',
          'TC Developer',
          '19 more..'
        ])}
        {filter('Sort', ['Priority', 'Creation Date', 'Author', 'Planned Date', 'Other..'])}
        {filter('Author', ['Anyone', 'Me', 'Specify..'])}
      </Toolbar>
    </div>
  );
};

export default App;
