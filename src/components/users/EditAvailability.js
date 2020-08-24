import React, { useState } from 'react';
import { Chip, Button } from '@material-ui/core';
import { ICONS } from '../../constants/Constants';
import { useStyles } from '../../styles/Styles';
import { formatDateRange } from '../../util/Dates';
import { DatePicker } from '../datepicker/DatePicker';
import { capitalize } from '../../util/String';

export const EditAvailability = ({ value, onAdd, onRemove, ...divStyleProps }) => {
  const classes = useStyles()();

  const [openDates, setOpenDates] = useState(false);

  const handleCloseDatesDialog = (range) => {
    setOpenDates(false);
    if (range !== null) {
      onAdd(range);
    }
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
            : value.map((availability, key) => (
                <Chip
                  style={{ margin: 4 }}
                  key={`chip_${key}`}
                  size="small"
                  label={capitalize(formatDateRange(availability))}
                  onDelete={() => {
                    onRemove(availability);
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  className={classes.chip}
                />
              ))}
        </div>
        <Button
          color="primary"
          style={{ margin: 0, padding: '10px', minWidth: 0, minHeight: 0 }}
          onClick={() => setOpenDates(true)}
        >
          {ICONS.NEW}
        </Button>
      </div>
      <DatePicker
        open={openDates}
        requireBothDates
        prompt="For which dates are you available?"
        firstDateLabel={`Start date`}
        secondDateLabel={`End date`}
        handleClose={handleCloseDatesDialog}
      />
    </div>
  );
};
