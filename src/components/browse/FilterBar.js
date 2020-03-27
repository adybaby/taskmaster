import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import { setTaskFilter } from '../../redux/actions/TaskFilters';
import { setSortOrder } from '../../redux/actions/SortOrder';
import * as SORT_ORDER from '../../constants/SortOrders';
import {
  getVisibleTasksOmitVacancies,
  getVisibleTasksOmitCreatedBy,
  getVisibleTasksOmitCreatedDate,
  getVisibleTasksOmitStartDate,
  getVisibleTasksOmitEndDate,
} from '../../redux/selectors/TaskSelector';
import { getVacancyOptions, getCreatedByOptions, getDateOptions } from './helpers/FilterBarOptions';
import { DatesDialog } from './DatesDialog';
import * as FILTERS from '../../constants/TaskFilters';

const useStyles = makeStyles((theme) => styles(theme));

const FilterBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const visibleTasksOmitCreatedDate = useSelector(getVisibleTasksOmitCreatedDate);
  const visibleTasksOmitVacancies = useSelector(getVisibleTasksOmitVacancies);
  const visibleTasksOmitCreatedBy = useSelector(getVisibleTasksOmitCreatedBy);
  const visibleTasksOmitStartDate = useSelector(getVisibleTasksOmitStartDate);
  const visibleTasksOmitEndDate = useSelector(getVisibleTasksOmitEndDate);
  const sortOrder = useSelector((state) => state.sortOrder);
  const taskFilters = useSelector((state) => state.taskFilters);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const [openDates, setOpenDates] = useState(false);
  const [pickingDateType, setPickingDateType] = useState(null);
  const [currentPickerTitle, setCurrentPickerTitle] = useState(null);

  const handleCloseDates = (from, to) => {
    setOpenDates(false);
    if (!(from === null && to === null)) {
      dispatch(setTaskFilter({ type: pickingDateType, value: 'SPECIFIED', query: { from, to } }));
    }
    setPickingDateType(null);
  };

  const handleFilterChange = (event, type, title) => {
    if (event.target.value === 'SPECIFIED') {
      setPickingDateType(type);
      setCurrentPickerTitle(title);
      setOpenDates(true);
    } else {
      const dateOption = FILTERS.DATE_OPTIONS[event.target.value];
      if (typeof dateOption !== 'undefined') {
        dispatch(setTaskFilter({ type, value: event.target.value, query: dateOption.query }));
      } else {
        dispatch(setTaskFilter({ type, value: event.target.value }));
      }
    }
  };

  const handleSortChange = (event) => {
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
            onChange={(event) => handleFilterChange(event, type, title)}
            value={taskFilter.value}
          >
            {options.map((option, index) => (
              <MenuItem key={index} name={option.label} value={option.value}>
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
        onChange={(event) => handleSortChange(event)}
        value={sortOrder}
      >
        {Object.entries(SORT_ORDER.OPTIONS).map((option) => (
          <MenuItem name={option.label} key={option[0]} value={option[1]}>
            {option[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <div className={classes.mainTabBar}>
        <Toolbar>
          <Filter
            type="createdDate"
            taskFilter={taskFilters.createdDate}
            title="Created Date"
            options={getDateOptions(visibleTasksOmitCreatedDate, 'createdDate')}
          />
          <Filter
            type="vacancies"
            taskFilter={taskFilters.vacancies}
            title="Vacancies"
            options={getVacancyOptions(visibleTasksOmitVacancies, tasks, currentUser)}
          />
          <Filter
            type="startDate"
            taskFilter={taskFilters.startDate}
            title="Start Date"
            options={getDateOptions(visibleTasksOmitStartDate, 'startDate', true)}
          />
          <Filter
            type="endDate"
            taskFilter={taskFilters.endDate}
            title="End Date"
            options={getDateOptions(visibleTasksOmitEndDate, 'endDate', true)}
          />
          <Filter
            type="createdBy"
            taskFilter={taskFilters.createdBy}
            title="Created By"
            options={getCreatedByOptions(visibleTasksOmitCreatedBy, users)}
          />
          <SortButton />
        </Toolbar>
        <DatesDialog
          open={openDates}
          handleClose={handleCloseDates}
          currentPickerTitle={currentPickerTitle}
        />
      </div>
    </>
  );
};

export default FilterBar;
