import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import * as TASK_FILTERS from '../../constants/TaskFilters';
import { setTaskFilter } from '../../redux/actions/TaskFilters';
import { setSortOrder } from '../../redux/actions/SortOrder';
import * as SORT_ORDER from '../../constants/SortOrders';
import { getNeededSkills } from '../../util/Vacancies';
import {
  getVisibleTasksOmitVacancies,
  getVisibleTasksOmitCreatedBy,
  getVisibleTasksOmitCreatedOn,
  filterByDate
} from '../../redux/selectors/TaskSelector';

const useStyles = makeStyles(theme => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const visibleTasksOmitCreatedOn = useSelector(getVisibleTasksOmitCreatedOn);
  const visibleTasksOmitVacancies = useSelector(getVisibleTasksOmitVacancies);
  const visibleTasksOmitCreatedBy = useSelector(getVisibleTasksOmitCreatedBy);
  const sortOrder = useSelector(state => state.sortOrder);
  const taskFilters = useSelector(state => state.taskFilters);
  const users = useSelector(state => state.users);

  const getVacancyOptions = () => {
    const countSkillVacancies = skill => {
      let count = 0;
      const tasksWithVacs = visibleTasksOmitVacancies.filter(
        vt =>
          typeof vt.vacancies !== 'undefined' && vt.vacancies !== null && vt.vacancies.length > 0
      );
      tasksWithVacs.forEach(twv => {
        count += twv.vacancies.filter(v => v.title === skill).length;
      });
      return count;
    };

    const vo = [];

    getNeededSkills(tasks).forEach(ns => {
      const count = countSkillVacancies(ns);
      if (count !== 0) {
        vo.push({
          label: `${ns} (${count})`,
          value: ns
        });
      }
    });
    vo.sort();

    vo.unshift({
      label: TASK_FILTERS.DEFAULTS.VACANCIES.value,
      value: TASK_FILTERS.DEFAULTS.VACANCIES.value
    });

    return vo;
  };

  const getCreatedByOptions = () => {
    const countCreatedBy = id =>
      visibleTasksOmitCreatedBy.filter(task => task.createdBy === id).length;

    const co = [];

    users.forEach(user => {
      const count = countCreatedBy(user.id);
      if (count !== 0) {
        co.push({
          label: `${user.name} (${count})`,
          value: user.id
        });
      }
    });

    co.sort();

    co.unshift({
      label: TASK_FILTERS.DEFAULTS.CREATED_BY.value,
      value: TASK_FILTERS.DEFAULTS.CREATED_BY.value
    });

    return co;
  };

  const getCreatedOnOptions = () => {
    const countCreatedOn = value => {
      return filterByDate(visibleTasksOmitCreatedOn, value).length;
    };

    return Object.entries(TASK_FILTERS.CREATED_OPTIONS).map(entry => ({
      label: `${entry[1]} (${countCreatedOn(entry[1])})`,
      value: entry[1]
    }));
  };

  const handleFilterChange = (event, type) => {
    dispatch(setTaskFilter({ type, value: event.target.value }));
  };

  const handleSortChange = event => {
    dispatch(setSortOrder(event.target.value));
  };

  const Filter = ({ type, taskFilter, title, options }) => {
    if (taskFilter.enabled) {
      return (
        <FormControl key={taskFilter.type} size="small" className={classes.filterControl}>
          <InputLabel id={`${title}label`}>{title}</InputLabel>
          <Select
            autoWidth={true}
            defaultValue={options[0].value}
            labelId={`${title}select-label`}
            id={`${title}select`}
            onChange={event => handleFilterChange(event, type)}
            value={taskFilter.value}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    return null;
  };

  const SortButton = () => (
    <FormControl key="Sort" size="small" className={classes.filterControl}>
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
    <div className={classes.mainTabBar}>
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
