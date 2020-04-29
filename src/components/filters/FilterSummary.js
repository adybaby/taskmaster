import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';
import { TASK_LIST_FILTER_CONTROL_IDS } from '../../constants/Constants';
import { resetAllTaskListFilterControls } from '../../state/actions/TaskListFilterActions';
import { getAllActiveTaskFilters } from '../../state/selectors/FilterSelector';
import { getVisibleTasks } from '../../state/selectors/TaskListSelector';
import { formatDateRange } from '../../util/Dates';

const makeSummaryString = (forControl) => {
  const selected = forControl.options.find((option) => option.id === forControl.selectedId);
  return `${forControl.label} ${
    selected.datePicker ? formatDateRange(selected.params) : selected.label
  }`;
};

export const FilterSummary = ({ forControl, icon, ...typographyProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector((state) => state.currentTab);
  const activeTaskFilterControls = useSelector(getAllActiveTaskFilters).filter(
    (control) => control.id !== TASK_LIST_FILTER_CONTROL_IDS.TYPE
  );
  const taskListTotal = useSelector(getVisibleTasks).length;

  const appendClearButton = (summaryString) => (
    <>
      {summaryString}{' '}
      <Button className={classes.link} onClick={() => dispatch(resetAllTaskListFilterControls())}>
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

  if (activeTaskFilterControls.length === 0) return applyStyles(`${taskListTotal} ${taskNoun}`);
  const collective = singleTask ? ' is ' : ' are ';

  return applyStyles(
    appendClearButton(
      activeTaskFilterControls.reduce((summaryString, filter, index) => {
        let join = '';
        if (index < activeTaskFilterControls.length - 2 && activeTaskFilterControls.length > 2) {
          join = ', ';
        } else if (index < activeTaskFilterControls.length - 1) {
          join = ' and ';
        }

        if (filter.id === TASK_LIST_FILTER_CONTROL_IDS.SEARCH_FIELD) {
          return `${summaryString} ${singleTask ? 'contains' : 'contain'} "${filter.text}"${join}`;
        }

        let summaryItem = makeSummaryString(filter);
        summaryItem = summaryItem.charAt(0).toLowerCase() + summaryItem.slice(1);

        return `${summaryString}${collective}${summaryItem}${join}`;
      }, `${taskListTotal} ${taskNoun}`)
    )
  );
};
