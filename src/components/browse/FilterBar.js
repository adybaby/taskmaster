import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/Styles';
import { SelectFilter } from './SelectFilter';
import { SortControl } from './SortControl';
import { FILTER_IDS } from '../../data/filters/Filters';

const useStyles = makeStyles(styles);

export const FilterBar = () => {
  const classes = useStyles();
  const filterControls = useSelector((state) => state.filterControls);
  const currentType = filterControls.find((filterControl) => filterControl.id === FILTER_IDS.TYPE)
    .selectedId;

  return (
    <div className={classes.filterBar}>
      {filterControls.map((filterControl) => {
        return filterControl.onFilterBar &&
          (typeof filterControl.forTaskTypes === 'undefined' ||
            filterControl.forTaskTypes.includes(currentType)) ? (
          <SelectFilter key={filterControl.id} filterControl={filterControl} />
        ) : null;
      })}
      <SortControl currentTaskType={currentType} />
    </div>
  );
};
