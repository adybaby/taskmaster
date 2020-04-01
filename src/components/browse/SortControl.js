import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/Styles';
import { setSortOrder } from '../../redux/actions/SortOrderActions';
import * as SORT_ORDER from '../../data/sort/TaskSorter';

const useStyles = makeStyles((theme) => styles(theme));

export const SortControl = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const sortOrder = useSelector((state) => state.sortOrder);

  const handleSortChange = (event) => {
    dispatch(setSortOrder(event.target.value));
  };

  return (
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
};
