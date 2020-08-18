import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../../styles/Styles';
import * as logger from '../../../util/Logger';
import * as db from '../../../db/Db';
import { Vacancy } from './Vacancy';
import { UPDATE_STATUS } from '../../../constants/Constants';
import { AddEditVacancy } from './AddEditVacancy';

const variant = typographyVariant.task;

export const TaskVacancies = ({ task, currentUser, onChanged, onError }) => {
  const classes = useStyles()();

  const canEdit = task.editors.includes(currentUser.id);

  const [addEditVacancyOpen, setAddEditVacancyOpen] = useState(false);

  const onAddVacancyClick = () => {
    setAddEditVacancyOpen(true);
  };

  const onAddEditVacancyClose = () => {
    setAddEditVacancyOpen(false);
  };

  const onNewVacancy = (vacancy) => {
    setAddEditVacancyOpen(false);
    db.upsertVacancy(vacancy)
      .then((updateVacancy) => {
        logger.debug('Updated Vacancy.', updateVacancy);
        onChanged(updateVacancy);
      })
      .catch((e) => {
        const errorMsg = `Could not update Vacancy.${e.message}`;
        logger.error(errorMsg, e, vacancy);
        onError(errorMsg);
      });
  };

  const onVacancyChanged = () => {
    onChanged(UPDATE_STATUS.NEEDS_UPDATE);
  };

  const onVacancyEditError = (e) => {
    const errorMsg = `Could not update Vacancy.${e.message}`;
    logger.error(errorMsg, e);
    onError(errorMsg);
  };

  return (
    <>
      <div className={classes.taskSectionHeading}>
        <Typography variant={variant.heading}>Vacancies</Typography>
        {!canEdit ? null : (
          <Button className={classes.primaryButton} onClick={onAddVacancyClick}>
            ADD VACANCY..
          </Button>
        )}
      </div>
      <Divider />

      <div className={`${classes.taskSectionBody} ${classes.vacancySection}`}>
        {task.vacancies.map((vacancy, index) => (
          <Vacancy
            key={index}
            vacancy={vacancy}
            task={task}
            onChanged={onVacancyChanged}
            onError={onVacancyEditError}
            canEdit={canEdit}
          />
        ))}
      </div>
      <AddEditVacancy
        task={task}
        open={addEditVacancyOpen}
        onClose={onAddEditVacancyClose}
        onConfirm={onNewVacancy}
      />
    </>
  );
};
