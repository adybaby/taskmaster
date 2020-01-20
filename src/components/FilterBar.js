/* eslint-disable function-paren-newline */
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
import { setTaskFilter, setSortOrder } from '../actions/Tasks';
import * as SORT_ORDER from '../constants/SortOrders';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const tasks = useSelector(state => state.tasks);
  const sortOrder = useSelector(state => state.sortOrder);
  const taskFilters = useSelector(state => state.taskFilters);
  const dispatch = useDispatch();

  const getVacancyOptions = () => {
    const vacancyOptions = new Set([TASK_FILTERS.DEFAULTS.VACANCIES.value]);
    tasks.forEach(task => {
      if (task.vacancies != null) {
        task.vacancies.forEach(vacancy => {
          if (vacancy.trim().length > 0) {
            vacancyOptions.add(vacancy);
          }
        });
      }
    });
    return Array.from(vacancyOptions);
  };

  const getCreatedByOptions = () => {
    const createdByOptions = new Set([TASK_FILTERS.DEFAULTS.CREATED_BY.value]);
    tasks.forEach(task => {
      if (task.createdBy != null && task.createdBy.length > 0) {
        createdByOptions.add(task.createdBy);
      }
    });
    return Array.from(createdByOptions);
  };

  const handleFilterChange = (event, key) => {
    dispatch(setTaskFilter({ type: key, value: event.target.value }));
  };

  const handleSortChange = event => {
    dispatch(setSortOrder(event.target.value));
  };

  const Filter = ({ id, title, options }) => {
    if (taskFilters[id].enabled) {
      return (
        <FormControl key={id} size="small" className={classes.formControl}>
          <InputLabel id={`${title}label`}>{title}</InputLabel>
          <Select
            autoWidth={true}
            defaultValue={options[0]}
            labelId={`${title}select-label`}
            id={`${title}select`}
            onChange={event => handleFilterChange(event, id)}
            value={taskFilters[id].value}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return null;
  };

  const SortButton = () => (
    <FormControl key="Sort" size="small" className={classes.formControl}>
      <InputLabel id="Sort label">Sort</InputLabel>
      <Select
        autoWidth={true}
        defaultValue={SORT_ORDER.DEFAULT}
        labelId="sort select-label"
        id="sort select"
        onChange={event => handleSortChange(event)}
        value={sortOrder}
      >
        {Object.entries(SORT_ORDER.OPTIONS).map(option => (
          <MenuItem key={option[0]} value={option[1]}>
            {option[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.filterBar}>
      <Toolbar>
        <Filter
          id="createdOn"
          title="Created On"
          options={Object.entries(TASK_FILTERS.CREATED_OPTIONS).map(entry => entry[1])}
        />
        <Filter id="vacancies" title="Vacancies" options={getVacancyOptions()} />
        <Filter id="createdBy" title="Created By" options={getCreatedByOptions()} />
        <SortButton />
      </Toolbar>
    </div>
  );
};

export default FilterBar;
