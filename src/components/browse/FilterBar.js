import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import * as TASK_FILTERS from '../../constants/TaskFilters';
import { setTaskFilter, setSortOrder } from '../../actions/Tasks';
import * as SORT_ORDER from '../../constants/SortOrders';
import { getAllUsers } from '../../actions/Users';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const sortOrder = useSelector(state => state.sortOrder);
  const taskFilters = useSelector(state => state.taskFilters);
  const users = useSelector(state => state.allUsers);

  useEffect(() => {
    if (users.length < 1) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  const getVacancyOptions = () => {
    const vacancyOptions = new Set([TASK_FILTERS.DEFAULTS.VACANCIES.value]);
    tasks.forEach(task => {
      if (task.vacancies != null) {
        task.vacancies.forEach(vacancy => {
          vacancyOptions.add(vacancy.title);
        });
      }
    });
    return Array.from(vacancyOptions);
  };

  const getCreatedByOptions = () => {
    const list = users.map(user => user.name);
    list.sort();
    list.unshift(TASK_FILTERS.DEFAULTS.CREATED_BY.value);
    return list;
  };

  const getCreatedOnOptions = () =>
    Object.entries(TASK_FILTERS.CREATED_OPTIONS).map(entry => entry[1]);

  const handleFilterChange = (event, type) => {
    dispatch(setTaskFilter({ type, value: event.target.value }));
  };

  const handleSortChange = event => {
    dispatch(setSortOrder(event.target.value));
  };

  const Filter = ({ type, taskFilter, title, options }) => {
    if (taskFilter.enabled) {
      return (
        <FormControl key={taskFilter.type} size="small" className={classes.formControl}>
          <InputLabel id={`${title}label`}>{title}</InputLabel>
          <Select
            autoWidth={true}
            defaultValue={options[0]}
            labelId={`${title}select-label`}
            id={`${title}select`}
            onChange={event => handleFilterChange(event, type)}
            value={taskFilter.value}
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
          type="createdOn"
          taskFilter={taskFilters.createdOn}
          title="Created On"
          options={getCreatedOnOptions()}
        />
        <Filter
          type="vacancies"
          taskFilter={taskFilters.vacancies}
          title="Vacancies"
          options={getVacancyOptions()}
        />
        <Filter
          type="createdBy"
          taskFilter={taskFilters.createdBy}
          title="Created By"
          options={getCreatedByOptions()}
        />
        <SortButton />
      </Toolbar>
    </div>
  );
};

export default FilterBar;
