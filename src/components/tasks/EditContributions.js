/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
// import React, { useState, Fragment } from 'react';
// import Typography from '@material-ui/core/Typography';
// import { useSelector } from 'react-redux';
import {
  Chip,
  Button,
  Popover,
  MenuItem,
  Dialog,
  Typography,
  Divider,
  DialogActions,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ICONS, CONTRIBUTION_LEVELS } from '../../constants/Constants';
import { useStyles } from '../../styles/Styles';
import { DropDown } from '../DropDown';

export const EditContributions = ({
  value,
  taskType,
  taskId,
  field,
  onAdd,
  onRemove,
  ...divStyleProps
}) => {
  const classes = useStyles()();
  const [anchorEl, setAnchorEl] = useState(null);

  const getAvailableTaskType = () => {
    switch (taskType) {
      case 'DRIVER':
        if (field === 'contributesTo') {
          return null;
        }
        return 'ENABLER';
      case 'ENABLER':
        if (field === 'contributesTo') {
          return 'DRIVER';
        }
        return 'INITIATIVE';
      case 'INITIATIVE':
        if (field === 'contributesTo') {
          return 'ENABLER';
        }
        return null;
      default:
        return null;
    }
  };

  const taskSummaries = useSelector((state) => state.taskSummaries);
  const availableTaskType = getAvailableTaskType();
  const availableTasks = taskSummaries.filter(
    (ts) =>
      ts.id !== taskId && ts.type === availableTaskType && value.find((v) => v.id === ts.id) == null
  );

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedContributionTaskId, setSelectedContributionTaskId] = useState(null);

  const ContributionsPopup = () => {
    const [contribution, setContribution] = useState('');

    const onAddContribution = () => {
      const selectedTask = taskSummaries.find((t) => t.id === selectedContributionTaskId);
      const newContribution = {
        contribution,
        _id: uuid(),
        id: selectedTask.id,
        title: selectedTask.title,
        type: selectedTask.type,
      };
      onAdd(newContribution);
      setPopupOpen(false);
    };

    const onCancelled = () => {
      setPopupOpen(false);
    };

    return (
      <Dialog open={popupOpen} onClose={onCancelled} onEscapeKeyDown={onCancelled}>
        <div className={classes.editVacancyHeader}>
          <Typography variant="body1">
            <b>How does the task contribute?</b>
          </Typography>
        </div>

        <div style={{ margin: 20 }}>
          <DropDown
            id={'contribution'}
            value={contribution}
            items={CONTRIBUTION_LEVELS}
            onChange={(id, v) => setContribution(v)}
          />
        </div>
        <Divider />
        <DialogActions>
          <Button onClick={onCancelled}>Close (does not change anything)</Button>
          <Button disabled={contribution === ''} onClick={onAddContribution} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div {...divStyleProps}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #c4c4c4',
          borderRadius: '5px',
          padding: '10px 6px 10px 6px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {value == null
            ? null
            : value.map((contribution) => (
                <Chip
                  style={{ margin: 4 }}
                  key={`chip_${contribution._id}`}
                  size="small"
                  label={`${contribution.title} (${contribution.contribution})`}
                  onDelete={() => {
                    onRemove(contribution._id);
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  className={classes.chip}
                />
              ))}
        </div>
        {availableTasks.length === 0 ? null : (
          <Button
            color="primary"
            style={{ margin: 0, padding: '10px', minWidth: 0, minHeight: 0 }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            {ICONS.NEW}
          </Button>
        )}
      </div>
      <Popover
        open={anchorEl != null}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>
          {availableTasks.map((task, key) => (
            <MenuItem
              key={key}
              value={task.id}
              onClick={() => {
                setSelectedContributionTaskId(task.id);
                setAnchorEl(null);
                setPopupOpen(true);
              }}
            >
              {task.title}
            </MenuItem>
          ))}
        </div>
      </Popover>
      <ContributionsPopup />
    </div>
  );
};
