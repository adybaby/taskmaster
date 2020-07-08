import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Button, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { AtAGlance } from './AtAGlance';
import { Vacancy } from './vacancy/Vacancy';
import { setCurrentTab } from '../../state/actions/CurrentTabActions';
import * as logger from '../../util/Logger';
import { AddEditVacancy } from './vacancy/AddEditVacancy';

const variant = typographyVariant.task;

export const Task = () => {
  const classes = useStyles()();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [infoVisible, setInfoVisible] = useState(true);
  const task = useSelector((state) => state.tasks).find((t) => t.id === id);
  const vacancies = useSelector((state) => state.vacancies).filter(
    (vacancy) => vacancy.taskId === id
  );
  const [mounted, setMounted] = useState(false);
  const [addEditVacancyOpen, setAddEditVacancyOpen] = useState(false);

  useEffect(() => {
    if (!mounted) {
      dispatch(setCurrentTab(null));
      setMounted(true);
    }
  }, [dispatch, mounted]);

  const onTabChange = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  const onAddVacancyClick = () => {
    setAddEditVacancyOpen(true);
  };

  const onNewVacancy = (vacancy) => {
    setAddEditVacancyOpen(false);
    logger.debug('Adding vacancy', vacancy);
  };

  const onAddEditVacancyClose = () => {
    setAddEditVacancyOpen(false);
  };

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
              {vacancies.map((vacancy, index) => (
                <Vacancy key={index} vacancy={vacancy} />
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
};
