import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useStyles, typographyVariant } from '../../../styles/Styles';
import * as logger from '../../../util/Logger';
import * as db from '../../../db/Db';
import { Vacancy } from './Vacancy';
import { UPDATE_STATUS } from '../../../constants/Constants';
import { AddEditVacancy } from './AddEditVacancy';
import { HINT_IDS, Hint } from '../../hints/Hint';

const variant = typographyVariant.task;

export const TaskVacancies = ({ task, currentUser, onChanged, onError }) => {
  const classes = useStyles()();
  const { enqueueSnackbar } = useSnackbar();
  const canEdit =
    task.editors.includes(currentUser.id) || currentUser.permissions.includes('admin');

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
        logger.debug('Added Vacancy.', updateVacancy);
        enqueueSnackbar('Added Vacancy.', { variant: 'success' });
        onChanged(updateVacancy);
      })
      .catch((e) => {
        const errorMsg = `Could not add Vacancy.${e.message}`;
        logger.error(errorMsg, e, vacancy);
        onError(errorMsg);
      });
  };

  const onVacancyChanged = () => {
    onChanged(UPDATE_STATUS.NEEDS_UPDATE);
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

      {!canEdit ? null : <Hint id={HINT_IDS.VACANCIES} />}

      <div className={`${classes.taskSectionBody} ${classes.vacancySection}`}>
        {task.vacancies == null ? (
          <>None</>
        ) : (
          task.vacancies.map((vacancy, index) => (
            <Vacancy
              key={index}
              vacancy={vacancy}
              task={task}
              onChanged={onVacancyChanged}
              onError={onError}
              canEdit={canEdit || vacancy.recruiterId === currentUser.id}
              currentUser={currentUser}
            />
          ))
        )}
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
