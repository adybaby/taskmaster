import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { resetFilters } from '../../state/actions/FilterActions';
import { getFiltersForSummary } from '../../state/selectors/FilterSelector';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { formatDateRange } from '../../util/Dates';

const makeSummaryString = (forControl) => {
  const selected = forControl.selectedOption;
  return `${forControl.label} ${
    selected.datePicker ? formatDateRange(forControl.customRange) : selected.label
  }`;
};

export const FilterSummary = ({ forControl, icon, ...typographyProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector((state) => state.currentTab);
  const filtersForSummary = useSelector(getFiltersForSummary);
  const taskListTotal = useSelector(getVisibleTasks).length;

  const appendClearButton = (summaryString) => (
    <>
      {summaryString}{' '}
      <Button className={classes.link} onClick={() => dispatch(resetFilters())}>
        CLEAR
      </Button>
    </>
  );

  const applyStyles = (output) => (
    <span className={classes.filterSummary}>
      <Typography className={classes.filterSummaryTypography} {...typographyProps}>
        {output}
      </Typography>
      {`\u00A0`}
      {icon}
    </span>
  );

  if (typeof forControl !== 'undefined') return applyStyles(makeSummaryString(forControl));

  const singleTask = taskListTotal === 1;
  const taskNoun = singleTask ? currentTab.filterSummaryLabel : `${currentTab.filterSummaryLabel}s`;

  if (filtersForSummary.length === 0) return applyStyles(`${taskListTotal} ${taskNoun}`);
  const collective = singleTask ? ' is ' : ' are ';

  return applyStyles(
    appendClearButton(
      filtersForSummary.reduce((summaryString, filter, index) => {
        let join = '';
        if (index < filtersForSummary.length - 2 && filtersForSummary.length > 2) {
          join = ', ';
        } else if (index < filtersForSummary.length - 1) {
          join = ' and ';
        }

        if (filter.isTextFilter) {
          return `${summaryString} ${singleTask ? 'contains' : 'contain'} "${
            filter.params[0]
          }"${join}`;
        }

        let summaryItem = makeSummaryString(filter);
        summaryItem = summaryItem.charAt(0).toLowerCase() + summaryItem.slice(1);

        return `${summaryString}${collective}${summaryItem}${join}`;
      }, `${taskListTotal} ${taskNoun}`)
    )
  );
};
