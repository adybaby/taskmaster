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

  return (
    <div className={classes.filterBar}>
      <Toolbar>
        <FormControl size="small" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Creation Date</InputLabel>
          <Select
            autoWidth="true"
            defaultValue="1"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>Any Time</MenuItem>
            <MenuItem value={2}>Today</MenuItem>
            <MenuItem value={3}>This Week</MenuItem>
            <MenuItem value={4}>This Month</MenuItem>
            <MenuItem value={5}>Specify Period..</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Vacancies</InputLabel>
          <Select
            autoWidth="true"
            defaultValue="1"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>Any Vacancies</MenuItem>
            <MenuItem value={2}>Relevant Vacancies</MenuItem>
            <MenuItem value={3}>UX Designer</MenuItem>
            <MenuItem value={4}>Any Developer</MenuItem>
            <MenuItem value={5}>Systems Engineer</MenuItem>
            <MenuItem value={6}>Lean Facilitator</MenuItem>
            <MenuItem value={7}>HAK Developer</MenuItem>
            <MenuItem value={8}>TC Developer</MenuItem>
            <MenuItem value={9}>19 more..</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            autoWidth="true"
            defaultValue="1"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>Priority</MenuItem>
            <MenuItem value={2}>Creation Date</MenuItem>
            <MenuItem value={3}>Author</MenuItem>
            <MenuItem value={4}>Planned Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Author</InputLabel>
          <Select
            autoWidth="true"
            defaultValue="1"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>Anyone</MenuItem>
            <MenuItem value={2}>Me</MenuItem>
            <MenuItem value={3}>Specify..</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </div>
  );
};

export default App;
