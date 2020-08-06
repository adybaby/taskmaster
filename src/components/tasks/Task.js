import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Button, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS, UPDATE_STATUS } from '../../constants/Constants';
import { AtAGlance } from './AtAGlance';
import { Vacancy } from './vacancy/Vacancy';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { AddEditVacancy } from './vacancy/AddEditVacancy';
import { GeneralError } from '../GeneralError';

const variant = typographyVariant.task;

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
}

export const Task = () => {
  const classes = useStyles()();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [infoVisible, setInfoVisible] = useState(true);
  const [task, setTask] = useState(null);
  const [addEditVacancyOpen, setAddEditVacancyOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    dispatch(setCurrentTab(null));
  }, [dispatch]);

  useEffect(() => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  }, [id]);

  useEffect(() => {
    if (updateStatus === UPDATE_STATUS.NEEDS_UPDATE) {
      setUpdateStatus(UPDATE_STATUS.UPDATING);
      db.getFullTask(id)
        .then((retrievedTask) => {
          if (isMountedRef.current) {
            setTask(retrievedTask);
            setUpdateStatus(UPDATE_STATUS.UPDATED);
          }
        })
        .catch((e) => {
          logger.error(e);
          if (isMountedRef.current) {
            setErrorMsg(e);
            setUpdateStatus(UPDATE_STATUS.ERROR);
          }
        });
    }
  }, [id, task, updateStatus, isMountedRef]);

  const onTabChange = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

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
        setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
      })
      .catch((e) => {
        logger.error('Could not update Vacancy.', e, vacancy);
        setErrorMsg(e);
        setUpdateStatus(UPDATE_STATUS.ERROR);
      });
  };

  const onVacancyChanged = () => {
    setUpdateStatus(UPDATE_STATUS.NEEDS_UPDATE);
  };

  const onVacancyEditError = (e) => {
    setErrorMsg(e);
    setUpdateStatus(UPDATE_STATUS.ERROR);
  };

  switch (updateStatus) {
    case UPDATE_STATUS.UPDATING:
      return (
        <div className={classes.taskHeading}>
          <Typography variant={variant.heading}>
            <b>Retrieving task from the database..</b>
          </Typography>
        </div>
      );
    case UPDATE_STATUS.UPDATED:
      return task === null ? null : (
        <>
          <div className={classes.mainTabBar}>
            <Tabs value={'READ'} indicatorColor="primary" onChange={onTabChange}>
              <Tab value={'READ'} className={classes.tab} label={<div>Read</div>} />
              <Tab value={'EDIT'} className={classes.tab} label={<div>Edit</div>} />
            </Tabs>
          </div>

          <div className={classes.taskHeading}>
            <Typography variant={variant.heading}>
              <b>{task.title}</b>
            </Typography>
            <Button
              value="showTaskInfoButton"
              classes={{ root: classes.taskInfoButton }}
              onClick={() => setInfoVisible(!infoVisible)}
              data-selected={String(infoVisible)}
            >
              {ICONS.INFO}
            </Button>
          </div>
          <div className={classes.taskContent}>
            {infoVisible ? <AtAGlance task={task} /> : null}
            <Typography className={classes.taskSectionHeading} variant={variant.heading}>
              Outline
            </Typography>
            <Divider />
            <Typography className={classes.taskSectionBody} variant={variant.body}>
              {task.moreInformation}
            </Typography>

            {task.type === 'INITIATIVE' ? (
              <>
                <Typography className={classes.taskSectionHeading} variant={variant.heading}>
                  Hypotheses
                </Typography>
                <Divider />
                <Typography className={classes.taskSectionBody} variant={variant.body}>
                  {task.hypotheses}
                </Typography>
                <Typography className={classes.taskSectionHeading} variant={variant.heading}>
                  Successful If
                </Typography>
                <Divider />
                <Typography className={classes.taskSectionBody} variant={variant.body}>
                  {task.successfulIf}
                </Typography>
                <Typography className={classes.taskSectionHeading} variant={variant.heading}>
                  Approach
                </Typography>
                <Divider />
                <Typography className={classes.taskSectionBody} variant={variant.body}>
                  {task.approach}
                </Typography>
                <div className={classes.taskSectionHeading}>
                  <Typography variant={variant.heading}>Vacancies</Typography>
                  <Button className={classes.primaryButton} onClick={onAddVacancyClick}>
                    ADD VACANCY..
                  </Button>
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
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <AddEditVacancy
            task={task}
            open={addEditVacancyOpen}
            onClose={onAddEditVacancyClose}
            onConfirm={onNewVacancy}
          />
        </>
      );
    case UPDATE_STATUS.ERROR:
      return (
        <GeneralError
          errorMsg="There was an error displaying the task"
          errorDetailsMsg={errorMsg}
        />
      );
    default:
      return null;
  }
};
