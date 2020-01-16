import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Styles';
import * as TASK_FILTERS from '../constants/TaskFilters';
import { addTaskFilter, removeTaskFilter } from '../actions/Tasks';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const tasks = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  const getVacancyOptions = () => {
    const vacancies = new Set([TASK_FILTERS.VACANCY_OPTIONS.ANY_VACANCY]);
    tasks.forEach(task => {
      if (task.vacancies != null) {
        task.vacancies.forEach(vacancy => {
          if (vacancy.trim().length > 0) {
            vacancies.add(vacancy);
          }
        });
      }
    });
    return Array.from(vacancies);
  };

  const getCreatedByOptions = () => {
    const authors = new Set([TASK_FILTERS.AUTHOR_OPTIONS.ANY_AUTHOR]);
    tasks.forEach(task => {
      if (task.createdBy != null && task.createdBy.length > 0) {
        authors.add(task.createdBy);
      }
    });
    return Array.from(authors);
  };

  const handleFilterChange = (event, title) => {
    const { value } = event.target;
    if (
      value === TASK_FILTERS.CREATED_OPTIONS.ANY_AUTHOR ||
      value === TASK_FILTERS.VACANCY_OPTIONS.ANY_VACANCY ||
      value === TASK_FILTERS.AUTHOR_OPTIONS.ANY_AUTHOR
    ) {
      dispatch(removeTaskFilter({ type: title }));
    } else {
      dispatch(addTaskFilter({ type: title, value: event.target.value }));
    }
  };

  const Filter = ({ title, options }) => (
    <FormControl key={title} size="small" className={classes.formControl}>
      <InputLabel id={`${title}label`}>{title}</InputLabel>
      <Select
        autoWidth={true}
        defaultValue={options[0]}
        labelId={`${title}select-label`}
        id={`${title}select`}
        onChange={event => handleFilterChange(event, title)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.filterBar}>
      <Toolbar>
        <Filter
          title={TASK_FILTERS.CREATED}
          options={Object.entries(TASK_FILTERS.CREATED_OPTIONS).map(entry => entry[1])}
        />
        <Filter title={TASK_FILTERS.VACANCIES} options={getVacancyOptions()} />
        <Filter title={TASK_FILTERS.AUTHOR} options={getCreatedByOptions()} />
      </Toolbar>
    </div>
  );
};

export default FilterBar;
