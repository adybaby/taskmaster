import React from 'react';
import { Typography } from '@material-ui/core';
import { FieldArray } from 'formik';
import { useStyles, typographyVariant } from '../../styles/Styles';
import * as logger from '../../util/Logger';
import { EditContributions } from './EditContributions';

const variant = typographyVariant.task;

export const ContributionFields = ({ task, formik, currentUser }) => {
  const classes = useStyles()();

  const makeContributionField = (label, field, hint) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        {label}
      </Typography>
      <Typography variant="body2">
        <i>{hint}</i>
      </Typography>
      <FieldArray
        name={field}
        render={(arrayHelpers) => (
          <EditContributions
            value={formik.values[field]}
            field={field}
            taskType={task.type}
            taskId={task.id}
            onAdd={(contribution) => {
              logger.debug('Adding contribution', contribution);
              arrayHelpers.push({
                ...contribution,
                createdDate: new Date(),
                createdBy: currentUser.id,
              });
            }}
            onRemove={(id) => {
              logger.debug('Removing contribution with id ', id);
              // eslint-disable-next-line no-underscore-dangle
              arrayHelpers.remove(formik.values[field].findIndex((c) => c._id === id));
            }}
            style={{ paddingBottom: '14px', paddingTop: '14px' }}
          />
        )}
      />
    </>
  );

  const makeContributionFields = () => {
    switch (task.type) {
      case 'DRIVER':
        return makeContributionField(
          'Contributions',
          'contributions',
          'Are there any enabler(s) which contribute towards this driver already?'
        );
      case 'ENABLER':
        return (
          <>
            {makeContributionField(
              'Contributes to (Prioritises Enabler)',
              'contributesTo',
              'Which driver(s) does this enabler contribute towards? The number of drivers this contributes towards, the priorities of those drivers, and the level of each contribution determines the priorities of this enabler.'
            )}
            {makeContributionField(
              'Contributions',
              'contributions',
              'Are there any initiative(s) which contribute towards this enabler already?'
            )}
          </>
        );
      case 'INITIATIVE':
        return makeContributionField(
          'Contributes to (Prioritises Initiative)',
          'contributesTo',
          'Which enabler(s) does this initiative contribute towards? The number of enablers this contributes towards, the priorities of those enablers, and the level of each contribution determines the priorities of this enabler.'
        );
      default:
        return null;
    }
  };

  return makeContributionFields();
};
