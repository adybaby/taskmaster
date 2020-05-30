import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import { useStyles } from '../../styles/Styles';
import { resetAllFilterParams } from '../../state/actions/FilterParamActions';
import { getFiltersForSummary } from '../../state/selectors/FilterSelector';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { formatDateRange } from '../../util/Dates';

export const FilterSummary = ({ forControl, icon, ...typographyProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles()();
  const currentTab = useSelector((state) => state.currentTab);
  const filtersForSummary = useSelector(getFiltersForSummary);
  const filters = useSelector((state) => state.filters);
  const filterParams = useSelector((state) => state.filterParams);
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
    const params = filterParams[filter.id];
    if (filter.isTextFilter) {
      value = `"${params[0]}"`;
    } else if (filter.isSelectFilter) {
      const selected = filter.options.find((option) => option.id === params[0]);
      if (selected.datePicker) {
        value = formatDateRange({ startDate: params[1], endDate: params[2] });
      } else {
        value = selected.label;
      }
    } else if (filter.isCheckGroupFilter) {
      const checked = params.filter((param) => param.checked);
      const getOptionLabel = (paramIndex) =>
        filter.options.find((o) => o.id === checked[paramIndex].id).label;
      switch (checked.length) {
        case 0:
          value = 'None';
          break;
        case 1:
          value = getOptionLabel(0);
          break;
        case 2:
          value = `${getOptionLabel(0)} and ${getOptionLabel(1)}`;
          break;
        default:
          value = `${getOptionLabel(0)}, ${getOptionLabel(1)} and ${checked.length - 2} more`;
          break;
      }
    }

    if (filter.pluralizeOptionLabels) {
      value = pluralize(value);
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
      <Button className={classes.link} onClick={() => dispatch(resetAllFilterParams(filters))}>
        CLEAR
      </Button>
    </>
  );

  if (typeof forControl !== 'undefined') {
    return applyStyles(getFilterLabelAndValue(forControl));
  }

  const singleTask = taskListTotal === 1;
  const taskType = singleTask
    ? currentTab.filterSummaryLabel
    : `${pluralize(currentTab.filterSummaryLabel)}`;
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
