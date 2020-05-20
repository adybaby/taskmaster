import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { resetFilters } from '../../state/actions/FilterActions';
import { getFiltersForSummary } from '../../state/selectors/FilterSelector';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { formatDateRange } from '../../util/Dates';

export const FilterSummary = ({ forControl, icon, ...typographyProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const currentTab = useSelector((state) => state.currentTab);
  const filtersForSummary = useSelector(getFiltersForSummary);
  const taskListTotal = useSelector(getVisibleTasks).length;

  const getFilterLabelAndValue = (filter, singleTask) => {
    let label = null;
    if (typeof singleTask === 'undefined') {
      label = filter.labels.filter;
    } else if (filter.selectsPastTasks()) {
      label = singleTask ? filter.labels.summaryPastSingular : filter.labels.summaryPastPlural;
    } else {
      label = singleTask ? filter.labels.summarySingular : filter.labels.summaryPlural;
    }

    let value = null;
    if (filter.isTextFilter) {
      value = `"${filter.params[0]}"`;
    } else if (filter.isSelectFilter) {
      const selected = filter.selectedOption;
      if (selected.datePicker) {
        value = formatDateRange(filter.customRange);
      } else {
        value = selected.label;
      }
    } else if (filter.isCheckGroupFilter) {
      const checked = filter.getChecked();
      switch (checked.length) {
        case 0:
          value = 'None';
          break;
        case 1:
          value = checked[0].label;
          break;
        case 2:
          value = `${checked[0].label} and ${checked[1].label}`;
          break;
        default:
          value = `${checked[0].label}, ${checked[1].label} and ${checked.length - 2} more`;
          break;
      }
    }

    if (value.length > 1 && value[1] !== value[1].toUpperCase()) {
      value = value.toLowerCase();
    }

    return `${label} ${value}`;
  };

  const getListSeparator = (index) => {
    if (index < filtersForSummary.length - 2 && filtersForSummary.length > 2) {
      return ', ';
    }
    if (index < filtersForSummary.length - 1) {
      return ' and ';
    }
    return '';
  };

  const getTotalsLabel = (total) => (total === 0 ? 'No' : total);

  const applyStyles = (output) => (
    <span className={classes.filterSummary}>
      <Typography className={classes.filterSummaryTypography} {...typographyProps}>
        {output}
      </Typography>
      {`\u00A0`}
      {icon}
    </span>
  );

  const appendClearButton = (summaryString) => (
    <>
      {summaryString}{' '}
      <Button className={classes.link} onClick={() => dispatch(resetFilters())}>
        CLEAR
      </Button>
    </>
  );

  if (typeof forControl !== 'undefined') {
    return applyStyles(getFilterLabelAndValue(forControl));
  }

  const singleTask = taskListTotal === 1;
  const taskType = singleTask ? currentTab.filterSummaryLabel : `${currentTab.filterSummaryLabel}s`;
  const totalsLabel = getTotalsLabel(taskListTotal);

  if (filtersForSummary.length === 0) {
    return applyStyles(`${totalsLabel} ${taskType}`);
  }

  return applyStyles(
    appendClearButton(
      filtersForSummary.reduce((summaryString, filter, index) => {
        return (
          `${summaryString} ` +
          `${getFilterLabelAndValue(filter, singleTask)}` +
          `${getListSeparator(index)}`
        );
      }, `${totalsLabel} ${taskType}`)
    )
  );
};
