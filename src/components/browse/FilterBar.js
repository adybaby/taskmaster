import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Styles';
import { SelectFilter } from './SelectFilter';
import { SortControl } from './SortControl';
import { FILTER_IDS } from '../../data/filters/Filters';

const useStyles = makeStyles((theme) => styles(theme));

const FilterBar = () => {
  const classes = useStyles();
  const filterControls = useSelector((state) => state.filterControls);
  const currentType = filterControls.find((filterControl) => filterControl.id === FILTER_IDS.TYPE)
    .selectedFilterId;

  return (
    <div className={classes.mainTabBar}>
      <Toolbar>
        {filterControls.map((filterControl) => {
          return filterControl.onFilterBar && filterControl.forTaskTypes.includes(currentType) ? (
            <SelectFilter key={filterControl.id} filterControl={filterControl} />
          ) : null;
        })}
        <SortControl />
      </Toolbar>
    </div>
  );
};

export default FilterBar;
