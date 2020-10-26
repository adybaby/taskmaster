import React, { useState } from 'react';
import { Chip, Button, Typography } from '@material-ui/core';
import { FieldArray, useFormikContext } from 'formik';
import { ICONS } from '../../constants/Constants';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { formatDateRange } from '../../util/Dates';
import { DatePicker } from '../datepicker/DatePicker';
import { capitalize } from '../../util/String';
import * as logger from '../../util/Logger';

const variant = typographyVariant.task;

export const EditAvailability = () => {
  const classes = useStyles()();
  const formik = useFormikContext();
  const [openDates, setOpenDates] = useState(false);
  const value = formik.values.available;

  const renderField = (arrayHelpers) => (
    <div style={{ paddingBottom: '14px', paddingTop: '14px' }}>
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
                    logger.debug('Removing availability ', availability);
                    arrayHelpers.remove(formik.values.available.find((r) => r === availability));
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
        handleClose={(range) => {
          setOpenDates(false);
          if (range !== null) {
            logger.debug('Adding availability', range);
            arrayHelpers.push(range);
          }
        }}
      />
    </div>
  );

  return (
    <>
      <Typography className={classes.userSectionHeading} variant={variant.heading}>
        Availability
      </Typography>
      <Typography variant="body2">
        <i>
          When are you available for work? This does not commit you to be available, but helps us
          see which skills are available at which times, and where they may be shortages.
        </i>
      </Typography>
      <FieldArray name="available" render={renderField} />
    </>
  );
};
